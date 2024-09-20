import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Ana Sayfa"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Ana Sayfa</span>
        </Link>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bildirimler"
        asChild
      >
        <Link href="/">
          <Bell />
          <span className="hidden lg:inline">Bildirimler</span>
        </Link>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Mesajlar"
        asChild
      >
        <Link href="/">
          <Mail />
          <span className="hidden lg:inline">Mesajlar</span>
        </Link>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Kaydedilenler</span>
        </Link>
      </Button>
    </div>
  );
}
