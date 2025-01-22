import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, BookOpen } from "lucide-react"
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
    console.log("Found thoughts:", rows.length)
    return rows
  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      code: error.code,
      detail: error.detail,
      table: "Thoughts",
    })
    return []
  }
}

export default async function Thoughts() {
  const thoughts = await getLatestThoughts()

  // Add a fallback UI when no thoughts are available
  if (!thoughts.length) {
    return (
      <section className="w-100 max-w-[1100px] mx-auto">
        <div className="bg-white rounded-3xl p-12">
          <h2 className="font-['Times_New_Roman'] text-2xl px-4">
            Ini adalah beberapa <span className="font-bold">Tulisan</span> saya...
          </h2>
          <p className="text-gray-600 mt-4 px-4">Loading thoughts...</p>
          <div className="mt-8 text-center space-y-4">
            <p className="text-gray-600">Baca lebih banyak lagi?</p>
            <Link href="https://medium.com/@dhimasss.rizky" target="_blank" className="inline-block">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_%28website%29_logo.svg"
                alt="Medium"
                width={200}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-[1100px] mx-auto">
      <div className="bg-white rounded-3xl p-12">
        <h2 className="font-['Times_New_Roman'] text-2xl px-4">
          Ini adalah beberapa <span className="font-bold">Tulisan</span> saya...
        </h2>
        <div className="mt-8">
          {thoughts.map((thought, index) => (
            <article key={thought.id || index} className="px-8 py-6">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex-1 space-y-4">
                  <h3 className="font-bold text-xl">{thought.title}</h3>
                  <p className="text-gray-600 text-sm">{thought.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
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
              {index < thoughts.length - 1 && <div className="border-b border-gray-200 mt-6" />}
            </article>
          ))}
        </div>
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600">Baca lebih banyak lagi?</p>
          <Link href="https://medium.com/@dhimasss.rizky" target="_blank" className="inline-block">
            <div className="border-2 border-black text-black px-10 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_%28website%29_logo.svg"
                alt="Medium"
                width={120}
                height={40}
                className="h-auto"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

