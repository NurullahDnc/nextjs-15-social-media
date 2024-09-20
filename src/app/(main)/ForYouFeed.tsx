"use client";
import Post from "@/components/post/Post";
import { SkeletonPost } from "@/components/Suspense";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function ForYouFeed() {
  const query = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const res = await fetch("/api/posts/for-you");
      if (!res.ok) {
        throw Error(`Request failed with status code ${res.status}`);
      }
      return res.json();
    },
  });

  if (query.status === "pending") {
    return <SkeletonPost size={4} />;
  }

  if (query.status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  if (query.data.length === 0) {
    return <p className="text-center">Hiçbir gönderi bulunamadı.</p>;
  }

  return (
    <>
      {query.data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
