import { Prisma } from "@prisma/client";



export const postDataInculude = {
  user:{
    select:{
        username: true,
        displayName: true,
        avatarUrl: true,

    }
  }
} satisfies Prisma.PostInclude

export type PostData = Prisma.PostGetPayload<{
    include: typeof postDataInculude
}>