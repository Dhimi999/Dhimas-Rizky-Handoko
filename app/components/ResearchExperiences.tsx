import Image from "next/image"
import { Microscope, MapPin, Calendar } from "lucide-react"
import { sql } from "@vercel/postgres"

interface Research {
  id: number
  image: string
  title: string
  type: string
  description: string
  place: string
  date: string
}

async function getLatestResearches() {
  try {
    const { rows } = await sql`
      SELECT * FROM "Researches"
      ORDER BY id DESC
      LIMIT 3
    `
    return rows as Research[]
  } catch (error) {
    console.error("Error fetching researches:", error)
    return []
  }
}

export default async function ResearchExperiences() {
  const researches = await getLatestResearches()

  return (
    <section className="w-full md:w-[calc(50%-0.5rem)]">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg h-full">
        <div className="flex items-center gap-3 mb-6">
          <Microscope className="w-8 h-8" />
          <h2 className="font-['Times_New_Roman'] text-2xl">
            Pengalaman <span className="font-bold">Riset & Asistensi</span>
          </h2>
        </div>
        <div className="space-y-6">
          {researches.map((research) => (
            <article key={research.id} className="flex gap-4">
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={research.image || "/placeholder.svg"}
                  alt={research.title}
                  className="rounded-lg object-cover"
                  fill
                />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-base leading-tight">{research.title}</h3>
                <p className="text-sm text-gray-600">{research.type}</p>
                {research.description.includes(";") ? (
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {research.description.split(";").map((point, index) => (
                      <li key={index}>{point.trim()}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">{research.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {research.place}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {research.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

