"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className="w-full  max-w-[264px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src="/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt="hamburger icon"
                        className="cursor-pointer sm:hidden"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-[#1B1E2D] p-4">
                    <Link href="/" className="flex items-center gap-1">
                        <Image
                            src="/icons/logo.svg"
                            width={32}
                            height={32}
                            alt="YOOM logo"
                            className="max-sm:size-10"
                        />
                        <p className="text-[26px] font-extrabold text-white ">Yoom</p>
                    </Link>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <div className="flex flex-col gap-6 pt-16 text-white">
                            {SidebarLinks.map((link) => {
                                const isActive =
                                    pathname === link.route ;

                                return (
                                    <SheetClose asChild key={link.label}>
                                        <Link
                                            href={link.route}
                                            className={cn(
                                                "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                                                {
                                                    "bg-[#0E78F9]": isActive,
                                                }
                                            )}
                                        >
                                            <Image
                                                src={link.imgUrl}
                                                alt={link.label}
                                                width={20}
                                                height={20}
                                            />
                                            <p className="font-semibold">
                                                {link.label}
                                            </p>
                                        </Link>
                                    </SheetClose>
                                );
                            })}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav;