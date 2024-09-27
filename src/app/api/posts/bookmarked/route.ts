import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {getPostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined; // son olan postId

    const pageSize = 10;

    if (!user) throw new Error("Yetkisiz giriş");

    const bookmark = await prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },
      include: {
        post: {
          include: getPostDataInclude(user.id),
        },
      },
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      bookmark.length > pageSize ? bookmark[pageSize].id : undefined;

    const data: PostsPage = {
      posts: bookmark.slice(0, pageSize).map((bookmark) => bookmark.post),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Internal Error" }, { status: 500 });
  }
}
