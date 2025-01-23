"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Instagram, BookOpen, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function SocialMediaDialog({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "bg-yellow-400 text-black px-3 xs:px-4 sm:pr-4 py-1 rounded-full text-xs xs:text-sm font-medium hover:bg-yellow-500 transition-colors",
            className,
          )}
        >
          Let&apos;s Connect!
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-md rounded-lg shadow-lg">
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold">Let&apos;s Connect!</h2>
          <div className="grid gap-2">
            <Link
              href="mailto:dhimasss.rizky@gmail.com"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>dhimasss.rizky@gmail.com</span>
            </Link>
            <Link
              href="https://instagram.com/dhimass.rizky"
              target="_blank"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span>@dhimass.rizky</span>
            </Link>
            <Link
              href="https://medium.com/@dhimasss.rizky"
              target="_blank"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              <span>@dhimasss.rizky</span>
            </Link>
            <div className="flex items-center gap-2 p-2 text-gray-500">
              <Linkedin className="h-5 w-5" />
              <span>Coming soon</span>
            </div>
            <div className="flex items-center gap-2 p-2 text-gray-500">
              <Twitter className="h-5 w-5" />
              <span>Coming soon</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

