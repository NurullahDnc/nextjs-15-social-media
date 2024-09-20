import PostEditor from "@/components/post/editor/PostEditor";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-[200vh] bg-red-300 w-full">
      <div className="w-full ">

        <PostEditor />
      </div>
    </main>
  );
}
