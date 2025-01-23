import Image from "next/image"
import { Hand } from "lucide-react"

export default function Hero() {
  return (
    <section className="content-container pt-4 xs:pt-8 sm:pt-6 md:pt-4 mt-16 xs:mt-14 sm:mt-12 md:mt-10">
      <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-lg flex flex-col md:flex-row items-center gap-8 sm:gap-12">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 flex-shrink-0">
          <Image
            src="https://i.pinimg.com/736x/14/97/30/1497306063c4f5495e9bafe6fef2715a.jpg"
            alt="Hi! It's me!"
            className="rounded-full object-cover"
            fill
            priority
          />
        </div>
        <div className="space-y-4 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Hand className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-wave" />
            </div>
            <h1 className="font-['Times_New_Roman'] text-2xl sm:text-3xl md:text-4xl">
              Halo!
              <br />
              Salam kenal, saya <span className="font-bold">Dhimas</span>.
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
            Mahasiswa Ilmu Keperawatan Universitas Jember. Tertarik pada dunia kesehatan jiwa, lingkungan hidup, dan
            teknologi informasi. Saya memiliki kreativitas tinggi, seorang pembelajar cepat, dan senang membangun
            komunikasi serta koneksi dengan orang baru.
          </p>
        </div>
      </div>
    </section>
  )
}

