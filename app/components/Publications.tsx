import Image from "next/image"
import { Book } from "lucide-react"
import { sql } from "@vercel/postgres"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { containerStyle, titleStyle, iconStyle, carouselContainerStyle } from "./SharedStyles"

interface Publication {
  id: number
  image: string
  title: string
  type: string
  editorial: string
  launch: string
  status: string
  other: string
}

async function getPublications() {
  try {
    const { rows } = await sql`
      SELECT * FROM "Publication"
      ORDER BY launch DESC
    `
    return rows as Publication[]
  } catch (error) {
    console.error("Error fetching publications:", error)
    return []
  }
}

export default async function Publications() {
  const publications = await getPublications()

  return (
    <section className="content-container px-4 sm:px-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        <div className={`${containerStyle}`}>
          <Book className={iconStyle} />
          <h2 className={titleStyle}>
            <span className="font-bold">Publikasi</span>
          </h2>
        </div>

        <div className={`${carouselContainerStyle} relative w-full md:w-3/4 overflow-visible`}>
          {publications.length > 0 ? (
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {publications.map((pub) => (
                  <CarouselItem
                    key={pub.id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
                  >
                    <div className="relative aspect-[3/4] group w-full max-w-[280px]">
                      <Image
                        src={pub.image || "/placeholder.svg"}
                        alt={pub.title}
                        fill
                        className="object-cover rounded-2xl transition-all duration-300 group-hover:brightness-50"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                          {pub.type}
                        </div>
                      </div>
                      <div className="absolute inset-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end rounded-2xl bg-black/40">
                        <h3 className="font-bold text-sm mb-1 leading-tight">{pub.title}</h3>
                        <p className="text-xs">{pub.editorial}</p>
                        <p className="text-xs">{pub.launch}</p>
                        <p className="text-xs">{pub.status}</p>
                        {pub.other && <p className="text-xs mt-1 text-gray-200">{pub.other}</p>}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="block">
                <CarouselPrevious className="absolute -left-3 sm:-left-10 bg-white hover:bg-gray-100" />
                <CarouselNext className="absolute -right-3 sm:-right-10 bg-white hover:bg-gray-100" />
              </div>
            </Carousel>
          ) : (
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <p className="text-gray-500">No publications available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

