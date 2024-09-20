import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict, format as formatDate } from 'date-fns';
import { tr } from 'date-fns/locale';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Tarih formatlama
export function formatRelativeDate(from: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true, locale: tr });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "MMM d", { locale: tr });
    } else {
      return formatDate(from, "MMM d, yyyy", { locale: tr });
    }
  }
}


export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",  //sayıyı kısaltarak (örneğin, 1,000 yerine 1K)
    maximumFractionDigits: 1,  // 1 basamak gosterilecek
  }).format(n);
}