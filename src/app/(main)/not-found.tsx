"use client"; // İstemci bileşeni olduğunu belirtir
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/"); // Yönlendirme işlemi
  };

  return (
    <main className="my-12 w-full space-y-3 text-center">
      <h1 className="text-3xl font-bold">Sayfa Bulunamadı</h1>
      <p>Aradığınız sayfa mevcut değil.</p>
      <button
        onClick={handleRedirect}
        className="mt-4 rounded underline text-black py-2 px-4"
      >
        Anasayfaya Dön
      </button>
    </main>
  );
}
