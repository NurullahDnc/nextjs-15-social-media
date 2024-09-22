"use client"
import useFolloweInfo from "@/hooks/useFolloweInfo";
import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowerCount({
  userId,
  initialState,
}: FollowerCountProps) {
  const { data } =  useFolloweInfo(userId, initialState);
  return (
    <span>
      Takipçiler: {""}
      <span className="font-semibold">{formatNumber(data.followers)}</span>
    </span>
  );
}
