import Image from "next/image";
import Link from "next/link";
import loginImage from "@/assets/login-image.jpg";
import { Metadata } from "next";
import LoginForm from "./loginForm";

export const metadata: Metadata = {
  title: "Giriş yap",
};

export default function page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Meyras&apos;a Giriş Yap</h1>
            <p className="text-muted-foreground">
              Hesabınız var mı? <span className="italic">Buradan</span> giriş yapabilirsiniz.
            </p>
          </div>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Hesabınız yok mu? Kayıt Olun
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt="Giriş Görseli" 
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
