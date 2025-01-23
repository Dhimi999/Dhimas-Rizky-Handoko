"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import SocialMediaDialog from "./SocialMediaDialog"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { href: "/", label: "Beranda" },
    { href: "/profile", label: "Profil" },
    { href: "/gallery", label: "Galeri dan Karya" },
    { href: "/stories", label: "Cerita (Coming Soon)" },
    { href: "/thoughts", label: "Tulisan (Medium)" },
    { href: "/cv", label: "Unduh CV" },
    { href: "/affiliate", label: "Afiliasi" },
    { href: "/custom", label: "Draft link" },
  ]

  return (
    <header
      className={cn(
        "py-2 px-2 xs:px-3 sm:py-3 sm:px-4 fixed w-full z-50 transition-all",
        isScrolled ? "backdrop-blur-md bg-white/50" : "",
      )}
    >
      <div className="max-w-[1100px] mx-auto bg-white/90 backdrop-blur-sm rounded-2xl px-2 xs:px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center border border-gray-90">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-end border-r border-gray-300 pl-2 sm:pl-4 pr-2 sm:pr-4">
            <span className="text-xs sm:text-sm font-['Times_New_Roman'] text-gray-600">Personal</span>
            <span className="text-xs sm:text-sm font-['Times_New_Roman'] text-gray-600">Blog</span>
          </div>
          <Link href="/" className="text-base sm:text-xl font-['Times_New_Roman'] font-bold truncate">
            <span className="inline xs:hidden sm:hidden md:hidden">Dhimas R. H.</span>
            <span className="hidden xs:inline sm:inline md:hidden">Dhimas Rizky H.</span>
            <span className="hidden xs:hidden sm:hidden md:inline xl:inline">Dhimas Rizky Handoko</span>
          </Link>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-white">
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <SocialMediaDialog className="whitespace-nowrap" />
        </div>
      </div>
    </header>
  )
}

