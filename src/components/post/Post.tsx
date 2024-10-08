"use client";
import { PostData } from "@/lib/types";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import { cn, formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/SessionProvider";
import PostMoreButton from "./PostMoreButton";
import Linkify from "../Linkify";
import UserTooltip from "../UserTooltip";
import { Media } from "@prisma/client";
import Image from "next/image";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import Comments from "../comments/Comments";

interface PostProps {
  post: PostData;
}

// post func.
export default function Post({ post }: PostProps) {
  const { user } = useSession();

  const [showcomments, setShowComments] = useState(false);

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="bold font-medium hover:underline"
              >
                {post.user.username}
              </Link>
            </UserTooltip>

            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}

      <hr className="text-muted-foreground" />

      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByUser: post.likes.some((like) => like.userId === user.id),
            }}
          />
          <CommentButton
            post={post}
            onclick={() => setShowComments(!showcomments)}
          />
        </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarksByUser: post.bookmarks.some((b) => b.userId === user.id),
          }}
        />
      </div>
      
      {showcomments && <Comments post={post} />}
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

// verilen medya eklerini alıp uygun bir grid düzeninde görüntüler.
function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1
          ? "grid grid-cols-2 sm:grid-cols-2"
          : "grid grid-cols-1",
      )}
    >
      {attachments.map((attachment) => (
        <div key={attachment.id}>
          <MediaPreview media={attachment} />
        </div>
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

// medya türüne göre görüntü veya video önizlemesi sunar
function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt="Attachment"
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      />
    );
  }
  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }
  return <p className="text-destructive">Desteklenmeyen medya türü</p>;
}

interface commentButtonProps {
  post: PostData;
  onclick: () => void;
}

// gonderi altında yorum icon buttonu
function CommentButton({ post, onclick }: commentButtonProps) {
  return (
    <button onClick={onclick} className="flex items-center gap-2">
      <MessageSquare className="size-5" />
      <span className="text-sm font-medium tabular-nums">
        {post._count.comments} <span className="hidden sm:inline"></span>
      </span>
    </button>
  );
}
