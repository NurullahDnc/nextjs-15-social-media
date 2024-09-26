import Link from "next/link";

const TextClip = (text: string, link?: string) => {
  // Eğer metin uzunluğu 25 karakterden kısa ise, doğrudan döndür
  if (text.length < 25) return text;

  return (
    <span>
      {text.substring(0, 40)}...
      <Link href={link || "#"}>devamı</Link>
    </span>
  );
};

export default TextClip;
