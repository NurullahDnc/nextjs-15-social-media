import Link from "next/link";
import { LinkIt, LinkItUrl } from "react-linkify-it";
import UserLinkWithTooltip from "./UserLinkWithTooltip";

interface LinkifyProps {
  children: React.ReactNode;
}
export default function Linkify({ children }: LinkifyProps) {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
}
function LinkifyUrl({ children }: LinkifyProps) {
  return (
    <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
  );
}

// Kullanıcı adlarını linklemek için kullanılan bileşen.
function LinkifyUsername({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/}
      component={(match, key) => (
        <UserLinkWithTooltip username={match.slice(1)}>
            {match} {/* Eşleşen metni gösteriyor. */}
        </UserLinkWithTooltip>
      )}
    >
      {children}
    </LinkIt>
  );
}

// Hashtag'leri linklemek için kullanılan bileşen.
function LinkifyHashtag({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9]+)/}
      component={(match, key) => (
        <Link
          key={key}
          href={`/hashtag/${match.slice(1)}`}
          className="text-primary hover:underline"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
}
