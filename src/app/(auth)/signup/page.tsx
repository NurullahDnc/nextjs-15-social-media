import Image from "next/image";
import Link from "next/link";
import signupImage from '@/assets/signup-image.jpg'
import { Metadata } from "next";
import SignUpForm from "./signUpForm";

export const metadata: Metadata = {
    title: "kayıt ol"
}

export default function page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
    <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
      <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-bold">Meyras'a Kaydol</h1>
          <p className="text-muted-foreground">
          Senin bile <span className="italic">burada</span> bir arkadaş bulabileceğin bir yer
          </p>
        </div>
        <div className="space-y-5">
          <SignUpForm />
          <Link href="/login" className="block text-center hover:underline">
          Zaten bir hesabınız var mı? Giriş yapmak
          </Link>
        </div>
      </div>
      <Image
        src={signupImage}
        alt="kaydol Görseli" 
        className="hidden w-1/2 object-cover md:block"
      />
    </div>
  </main>
  );
}
