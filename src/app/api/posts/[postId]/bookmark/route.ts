

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { BookmarkInfo } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ errors: "Yetkisiz giriş" }, { status: 401 });
    }

    const bookmark = await prisma.bookmark.findUnique({
        where: {
          userId_postId:{
            userId: loggedInUser.id,
            postId,
            
          }
        }
    })

      const data: BookmarkInfo = {
        isBookmarksByUser: !!bookmark, 
      };

      return Response.json(data);

  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Error" }, { status: 500 });
  }
}


export async function POST(
    req: Request,
    { params: { postId } }: { params: { postId: string } },
  ) {
    try {
      const { user: loggedInUser } = await validateRequest();
  
      if (!loggedInUser) {
        return Response.json({ errors: "Yetkisiz giriş" }, { status: 401 });
      }
  
      await prisma.bookmark.upsert({
        where: {
          userId_postId: {
            userId: loggedInUser.id,
            postId,
          },
        },
        create: {
          userId: loggedInUser.id,
          postId,
        },
        update: {},
      });
  
      return new Response();
    } catch (error) {
      console.log(error);
      return Response.json({ error: "Internal Error" }, { status: 500 });
    }
  }


  export async function DELETE(
    req: Request,
    { params: { postId } }: { params: { postId: string } },
  ) {
    try {
      const { user: loggedInUser } = await validateRequest();
  
      if (!loggedInUser) {
        return Response.json({ errors: "Yetkisiz giriş" }, { status: 401 });
      }
  
      await prisma.bookmark.deleteMany({
        where: {
          userId: loggedInUser.id,
          postId: postId,
        },
      });
  
      return new Response();
    } catch (error) {
      console.log(error);
      return Response.json({ error: "Internal Error" }, { status: 500 });
    }
  }
  