import Image from "next/image";
import userAvatar from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  className?: string;
  size: number;
  avatarUrl?: string | undefined | null;
}
export default function UserAvatar({
  className,
  size,
  avatarUrl,
}: UserAvatarProps) {
  return (
    <Image
      src={avatarUrl || userAvatar}
      alt="user avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className,
      )}
    />
  );
}
