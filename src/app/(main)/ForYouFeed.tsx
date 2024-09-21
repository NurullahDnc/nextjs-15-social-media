"use client";
import Post from "@/components/post/Post";
import { SkeletonPost } from "@/components/Suspense";
import kyInstance from "@/lib/ky";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function ForYouFeed() {
  const query = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: kyInstance.get("/api/posts/for-you").json<PostData[]>,
  });

  if (query.status === "pending") {
    return <SkeletonPost size={4} />;
  }

  if (query.status === "error") {
    return (
      <p className="text-center text-destructive">
        Gönderiler yüklenirken bir hata oluştu.
      </p>
    );
  }

  if (query.data.length === 0) {
    return <p className="text-center">Hiçbir gönderi bulunamadı.</p>;
  }

  return (
    <div className="space-y-5">
      {query.data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
