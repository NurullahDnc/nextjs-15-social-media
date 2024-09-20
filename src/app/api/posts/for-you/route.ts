import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) throw new Error("Yetkisiz giriş");

    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: "desc" },
    });

    return Response.json(posts);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Internal Error" }, { status: 500 });
  }
}
