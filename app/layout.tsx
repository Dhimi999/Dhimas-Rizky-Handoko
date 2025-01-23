import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dhimas's Personal Blog",
  description: "A collection of my stories, projects, and achievements",
  icons:{
    icon:"./moji.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow px-3 py-12 mt-[10px]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

