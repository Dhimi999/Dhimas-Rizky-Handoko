import Image from "next/image"
import Link from "next/link"
import { GalleryVerticalIcon as GalleryIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { promises as fs } from "fs"
import path from "path"

interface Photo {
  id: string
  date: string
  title: string
  url: string
  location: string
}

async function getLatestPhotos(): Promise<Photo[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "photo.txt")
    const fileContent = await fs.readFile(filePath, "utf-8")

    const photos = fileContent
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const [id, date, title, url, location] = line.split(";")
        return { id, date, title, url, location }
      })
      .sort((a, b) => {
        const dateA = new Date(a.date.replace(/:/g, "-"))
        const dateB = new Date(b.date.replace(/:/g, "-"))
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, 4)

    return photos
  } catch (error) {
    console.error("Error reading photo data:", error)
    return []
  }
}

export default async function Gallery() {
  const photos = await getLatestPhotos()

  return (
    <section className="content-container px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 md:p-12 shadow-lg">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <GalleryIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          <h2 className="font-['Times_New_Roman'] text-xl sm:text-2xl">
            <span className="font-bold">Galeri</span> dan Karya
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                  <h3 className="font-bold text-sm mb-1">{photo.title}</h3>
                  <p className="text-xs">{photo.location}</p>
                  <p className="text-xs">
                    {new Date(photo.date.replace(/:/g, "-")).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/gallery">
            <Button variant="outline">Lihat Lebih Banyak</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

