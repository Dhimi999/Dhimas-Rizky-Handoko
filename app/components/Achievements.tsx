"use client"

import Image from "next/image"
import { Trophy } from "lucide-react"
import { sql } from "@vercel/postgres"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { containerStyle, titleStyle, iconStyle, carouselContainerStyle } from "./SharedStyles"

interface Achievement {
  id: number
  image_cover: string
  rank: string
  type: string
  scope: string
  title: string
  organization: string
  place: string
  year: string
}

async function getAchievements() {
  try {
    const { rows } = await sql`
      SELECT * FROM "Achievement"
      ORDER BY year DESC
    `
    return rows as Achievement[]
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return []
  }
}

export default async function Achievements() {
  const achievements = await getAchievements()

  return (
    <section className="content-container px-4 sm:px-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className={containerStyle}>
          <Trophy className={iconStyle} />
          <h2 className={titleStyle}>
            <span className="font-bold">Prestasi</span>
          </h2>
        </div>

        <div className={`${carouselContainerStyle} relative w-full md:w-3/4 overflow-visible`}>
          {achievements.length > 0 ? (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {achievements.map((achievement) => (
                  <CarouselItem key={achievement.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:h-[250px] xl:h-[350px] flex flex-col">
                      <div className="relative aspect-video">
                        <Image
                          src={achievement.image_cover || "/placeholder.svg"}
                          alt={achievement.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                            {achievement.rank}
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                        
                          <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-medium">{achievement.type}</span>
                              <span className="text-xs text-gray-500">{achievement.scope}</span>
                            </div>
                            <h3 className="font-medium text-sm line-clamp-2 text-center w-full">{achievement.title}</h3>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 space-y-0.5">
                          <p className="truncate">{achievement.organization}</p>
                          <p className="truncate">{achievement.place}</p>
                          <p>{achievement.year}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="absolute -left-10 hover:bg-white/90 cursor-pointer" />
                <CarouselNext className="absolute -right-10 hover:bg-white/90 cursor-pointer" />
              </div>
            </Carousel>
          ) : (
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <p className="text-gray-500">No achievements available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

