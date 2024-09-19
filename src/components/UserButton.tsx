"use client";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/action";
import Link from "next/link";

interface UserButtonProps {
  className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={cn("flex-none rounded-full", className)}>
            <UserAvatar avatarUrl={user.avatarUrl} size={40} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-center ">
          <DropdownMenuLabel> @{user.username} </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup>
            <Link href={`/users/${user.username}`}>
              <DropdownMenuRadioItem className="cursor-pointer" value="top">
                 <UserIcon className="mr-1 size-5" />
                Profil
              </DropdownMenuRadioItem>
            </Link>

            <DropdownMenuSeparator />

            <DropdownMenuRadioItem
              className="cursor-pointer"
              onClick={() => logout()}
              value="right"
            >
              <LogOutIcon className="mr-1 size-4" />
              Çıkış Yap
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
