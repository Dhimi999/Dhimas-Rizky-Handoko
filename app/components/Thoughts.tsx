import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, BookOpen, PenLine } from "lucide-react"
import { sql } from "@vercel/postgres"

async function getLatestThoughts() {
  try {
    const { rows } = await sql`
      SELECT 
        id,
        title,
        CASE 
          WHEN LENGTH(description) > 265 
          THEN SUBSTRING(description, 1, 262) || '...'
          ELSE description
        END as description,
        thumbnail,
        date,
        hour,
        medium_link
      FROM "Thoughts" 
      ORDER BY date DESC, hour DESC 
      LIMIT 2
    `
    return rows
  } catch (error) {
    console.error("Error fetching thoughts:", error)
    return []
  }
}

export default async function Thoughts() {
  const thoughts = await getLatestThoughts()

  return (
    <section className="w-full max-w-[1100px] mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8">
        <div className="flex items-start sm:items-center gap-2 px-2 sm:px-4 mb-4 flex-wrap sm:flex-nowrap">
          <PenLine className="w-6 h-6 hidden sm:block" />
          <h2 className="font-['Times_New_Roman'] text-xl sm:text-2xl">
            Ini adalah beberapa <span className="font-bold">Tulisan</span> saya...
          </h2>
        </div>
        <div className="mt-4">
          {thoughts.map((thought, index) => (
            <article key={thought.id || index} className="px-2 sm:px-8 py-4">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="flex-1 space-y-3">
                  <h3 className="font-bold text-lg sm:text-xl">{thought.title}</h3>
                  <p className="text-gray-600 text-sm">{thought.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      {new Date(thought.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {thought.hour}
                    </div>
                    <Link
                      href={thought.medium_link}
                      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 underline"
                      target="_blank"
                    >
                      <BookOpen className="w-4 h-4" />
                      Baca lebih lanjut...
                    </Link>
                  </div>
                </div>
                <div className="relative w-full md:w-48 h-48 flex-shrink-0 order-first md:order-last">
                  <Image
                    src={thought.thumbnail || "/placeholder.svg"}
                    alt={thought.title}
                    className="rounded-lg object-cover"
                    fill
                  />
                </div>
              </div>
              {index < thoughts.length - 1 && <div className="border-b border-gray-200 mt-4" />}
            </article>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-3">Baca lebih banyak lagi?</p>
          <Link href="https://medium.com/@dhimasss.rizky" target="_blank" className="inline-block">
            <div className="border-2 border-black text-black px-8 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_%28website%29_logo.svg"
                alt="Medium"
                width={100}
                height={20}
                className="h-5 w-auto"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

