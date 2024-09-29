import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import { Logo } from "../layout";

export default function Navbar(){

    return(
        <header className="sticky top-0 z-10 bg-card shadow-lg ">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-1 md:px-5 py-3">
                <Link href="/" className="text-2xl font-bold text-primary" >
                    {Logo}
                </Link>
                <SearchField />
                <UserButton className="sm:ml-auto" />
            </div>
        </header>
    )
}