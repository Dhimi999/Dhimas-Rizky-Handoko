import Image from "next/image"
import Link from "next/link"
import { Users, MapPin, Calendar } from "lucide-react"
import { sql } from "@vercel/postgres"
import { Button } from "@/components/ui/button"

interface Event {
  id: number
  image: string
  title: string
  type: string
  description: string
  place: string
  date: string
}

async function getLatestEvents() {
  try {
    const { rows } = await sql`
      SELECT * FROM "Events"
      ORDER BY id DESC
      LIMIT 3
    `
    return rows as Event[]
  } catch (error) {
    console.error("Error fetching events:", error)
    return null
  }
}

export default async function OrganizationalExperiences() {
  const events = await getLatestEvents()

  if (events === null) {
    return (
      <section className="w-full md:w-[calc(50%-0.5rem)]">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg h-full">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8" />
            <h2 className="font-['Times_New_Roman'] text-2xl">
              Pengalaman <span className="font-bold">Organisasi</span>
            </h2>
          </div>
          <p className="text-red-500">Unable to fetch organizational experiences. Please try again later.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full md:w-[calc(50%-0.5rem)]">
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 sm:w-8 sm:h-8" />
          <h2 className="font-['Times_New_Roman'] text-xl sm:text-2xl">
            Pengalaman <span className="font-bold">Organisasi</span>
          </h2>
        </div>
        <div className="space-y-6 flex-1">
          {events.map((event) => (
            <article key={event.id} className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="rounded-lg object-cover"
                  fill
                />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-base leading-tight">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.type}</p>
                {event.description.includes(";") ? (
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {event.description.split(";").map((point, index) => (
                      <li key={index}>{point.trim()}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">{event.description}</p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.place}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center space-y-4 pt-4 border-t">
          <p className="text-gray-600">Lihat lebih banyak?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/stories">
              <Button variant="outline">My Stories</Button>
            </Link>
            <Link href="/cv">
              <Button variant="outline">Unduh CV</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

