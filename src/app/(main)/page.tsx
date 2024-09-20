import PostEditor from "@/components/post/editor/PostEditor";
import Posts from "@/components/post/Post";
import TrendsSidebar from "@/components/TrendsSidebar";
import prisma from "@/lib/prisma";
import { postDataInculude } from "@/lib/types";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInculude,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="w-full min-w-0 flex gap-5 ">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />

        {posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div>
      <TrendsSidebar />
    </main>
  );
}
