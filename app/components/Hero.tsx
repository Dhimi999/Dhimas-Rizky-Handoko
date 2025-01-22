import Image from "next/image";

export default function Hero() {
  return (
    <section className="content-container pt-24 mt-16 sm:mt-12 md:mt-10">
      <div className="bg-white rounded-3xl p-12 shadow-lg flex flex-col md:flex-row items-center gap-12">
        {/* Bagian Gambar */}
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 flex-shrink-0">
          <Image
            src="https://i.pinimg.com/736x/14/97/30/1497306063c4f5495e9bafe6fef2715a.jpg"
            alt="Hi! It's me!"
            className="rounded-full object-cover"
            fill
            priority
          />
        </div>
        {/* Bagian Teks */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="font-['Times_New_Roman'] text-3xl sm:text-4xl">
            Halo!
            <br />
            Salam kenal, saya <span className="font-bold">Dhimas</span>.
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Mahasiswa Ilmu Keperawatan Universitas Jember. Tertarik pada dunia kesehatan jiwa, lingkungan hidup, dan teknologi informasi. Saya memiliki kreativitas tinggi, seorang pembelajar cepat, dan senang membangun komunikasi serta koneksi dengan orang baru.
          </p>
        </div>
      </div>
    </section>
  );
}

