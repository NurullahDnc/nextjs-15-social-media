import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  getPostDataInclude,
  NotificationPage,
  notificationsInclude,
  PostsPage,
} from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined; // son olan postId

    const pageSize = 10;

    if (!user) throw new Error("Yetkisiz giriş");

    const notifications = await prisma.notification.findMany({
      where: {
        recipientId: user.id,
      },
      include: notificationsInclude,
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      notifications.length > pageSize ? notifications[pageSize].id : undefined;

    const data: NotificationPage = {
      notification: notifications.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Internal Error" }, { status: 500 });
  }
}
