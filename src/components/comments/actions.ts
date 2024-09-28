"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCommentDataInclude, PostData } from "@/lib/types";
import { createCommentSchema } from "@/lib/validation";

//gonderi yorum oluşturma
export default async function submitComment({
  post,
  content,
}: {
  post: PostData;
  content: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Yetkilendirme Hatası");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const newComment = await prisma.comment.create({
    data: {
      content: contentValidated,
      userId: user.id,
      postId: post.id,
    },
    include: getCommentDataInclude(user.id),
  });

  return newComment;
}

//gonderi yorumu silme
export async function deleteComment(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Yetkilendirme Hatası");

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) throw new Error("Yorum Bulunamadı");

  if (comment.userId !== user.id) throw new Error("Yetkilendire Hatası");

  const deletedComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(user.id),
  });

  return deletedComment;
}
