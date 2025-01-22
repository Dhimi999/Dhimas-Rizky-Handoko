"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, Code, Laptop, Book, Users } from "lucide-react"

const skills = [
  {
    category: "Kesehatan Mental",
    icon: Brain,
    stats: "85%",
    description: "Pemahaman dan praktik dalam bidang kesehatan jiwa",
  },
  {
    category: "Keperawatan",
    icon: Heart,
    stats: "90%",
    description: "Keterampilan klinis dan perawatan pasien",
  },
  {
    category: "Pemrograman",
    icon: Code,
    stats: "75%",
    description: "Web development dan aplikasi kesehatan",
  },
  {
    category: "Teknologi",
    icon: Laptop,
    stats: "80%",
    description: "Penggunaan teknologi dalam kesehatan",
  },
  {
    category: "Riset",
    icon: Book,
    stats: "88%",
    description: "Penelitian dan publikasi ilmiah",
  },
  {
    category: "Komunikasi",
    icon: Users,
    stats: "92%",
    description: "Kemampuan interpersonal dan presentasi",
  },
]

export default function Skills() {
  return (
    <section className="content-container">
      <div className="bg-white rounded-3xl p-12 shadow-lg">
        <h2 className="font-['Times_New_Roman'] text-2xl mb-8">
          My <span className="font-bold">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                    <skill.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{skill.category}</h3>
                      <span className="text-sm font-medium text-blue-600">{skill.stats}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: skill.stats }}></div>
                    </div>
                    <p className="text-sm text-gray-500">{skill.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

