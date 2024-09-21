import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined  // son olan postId

    console.log("cursor cursor ", cursor );
    
    const pageSize = 10


    if (!user) throw new Error("Yetkisiz giriş");

    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,  // Bir sonraki sayfada daha fazla veri var mı kontrolü için bir fazla al.
      skip: cursor? 1 : 0,
      cursor: cursor? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : undefined

    const data : PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    }    

    return Response.json(data);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Internal Error" }, { status: 500 });
  }
}
