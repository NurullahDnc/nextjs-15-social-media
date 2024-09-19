"use client"
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";



export default function SearchField(){

    const router = useRouter()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const form = e.currentTarget;
        const q = (form.q as HTMLInputElement).value.trim();
        if(!q) return;

        // "encodeURIComponent" ile arama sorgusunu URL güvenli hale getiriyoruz.
        router.push(`/search?q=${encodeURIComponent(q)}`)

    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="relative">
                <Input name="q" className="pe-10" placeholder="Ara" />
                <SearchIcon className="absolute top-1/2 right-3 -translate-y-1/2 transform text-muted-foreground cursor-pointer size-5 " />
            </div>
        </form>
    )

}