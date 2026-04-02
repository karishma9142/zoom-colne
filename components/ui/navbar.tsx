import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobileNav";
import { Show, UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center fixed z-50 w-full bg-[#1B1E2D] px-6 py-4 lg:px-10">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src="/icons/logo.svg"
                    width={32}
                    height={32}
                    alt="YOOM logo"
                    className="max-sm:size-10"
                />
                <p className="text-[26px] font-extrabold text-white max-sm:hidden">Yoom</p>
            </Link>
            <div className="flex justify-between items-center gap-5">
                <Show when="signed-in">
                    <UserButton />
                </Show>
                <MobileNav />
            </div>
        </nav>
    )
}

export default Navbar;