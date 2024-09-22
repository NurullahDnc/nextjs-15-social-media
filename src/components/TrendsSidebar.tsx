import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import SkeletonWhoToFollow from "./Suspense";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";
import FollowButton from "./FollowButton";
import { getUserDataSelect } from "@/lib/types";

export default function TrendsSidebar() {
  return (
    <div className="sticky top-[5.28rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<SkeletonWhoToFollow size={2} />}>
        <WhoToFllow />
      </Suspense>

      <Suspense fallback={<SkeletonWhoToFollow size={2} />}>
        <TrendingTopics />
      </Suspense>
    </div>
  );
}

export async function WhoToFllow() {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFllow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id, // Doğrulanan kullanıcı hariç diğer kullanıcılar bulunur.
      },
      followers : {
        none: {
          followerId: user.id // Kullanıcının takip etmediği diğer kullanıcılar seçilir.
        }
      }
    },
    select: getUserDataSelect(user.id),
    take: 5,  // Sadece 5 kullanıcı döndürülür.
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-lg font-bold">Takip edilecek kişiler</div>

      {usersToFllow.map((user, index) => (
        <div key={index} className="flex items-center justify-between gap-3">
          <Link href={`/users/${user.username}`} className="flex items-center gap-3">
            <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
            <div>
              <p className="line-clamp-1 break-all text-[16px] font-semibold hover:underline">
                {user.displayName}
              </p>

              <p className="line-clamp-1 break-all text-sm text-muted-foreground">
                {user.username}
              </p>
            </div>
          </Link>
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: !!user.followers.some(  // Kullanıcının kendisini takip edip etmediğini kontrol eder
                ({ followerId }) => followerId === user.id,
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
}

const getTrendingTopics = unstable_cache(
  //Bu sorgu, posts tablosundaki içerikteki hashtag'leri küçük harfe çevirir, kaç kez kullanıldıklarını sayar, en popüler 5 tanesini azalan sırayla sıralar ve sonuçları döndürür.
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
              SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
              FROM posts
              GROUP BY (hashtag)
              ORDER BY count DESC, hashtag ASC
              LIMIT 5
          `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-lg font-bold">Trend konular</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "paylaşım" : "paylaşımlar"}
            </p>
          </Link>
        );
      })}{" "}
    </div>
  );
}
