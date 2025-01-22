"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import SocialMediaDialog from "./SocialMediaDialog"
import { useState, useEffect } from "react"

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
    { href: "/profile", label: "Profil" },
    { href: "/stories", label: "Cerita (Coming Soon)" },
    { href: "/thoughts", label: "Tulisan (Medium)" },
    { href: "/cv", label: "Unduh CV" },
    { href: "/affiliate", label: "Afiliasi" },
    { href: "/custom", label: "Draft link" },
  ]

  return (
    <header
      className={`py-3 px-4 fixed w-full z-50 transition-all ${isScrolled ? "backdrop-blur-md bg-white/50" : ""}`}
    >
      <div className="max-w-[1100px] mx-auto bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 flex justify-between items-center border border-gray-90">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end border-r border-gray-300 pr-4">
            <span className="text-sm font-['Times_New_Roman'] text-gray-600">Personal</span>
            <span className="text-sm font-['Times_New_Roman'] text-gray-600">Blog</span>
          </div>
          <Link href="/" className="text-xl font-['Times_New_Roman'] font-bold">
            Dhimas Rizky Handoko
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <SocialMediaDialog />
        </div>
      </div>
    </header>
  )
}

