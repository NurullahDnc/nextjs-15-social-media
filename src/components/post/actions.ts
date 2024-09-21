"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Yetkilendirme Hatası");

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post bulunamadı");

  if (post.userId !== user.id) throw new Error("Yetkilendirme Hatası");

  const deletePost = await prisma.post.delete({
    where: { id },
    include: getPostDataInclude(user.id),
  });

  return deletePost;
}
