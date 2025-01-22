import Hero from "./components/Hero"
import Thoughts from "./components/Thoughts"
import Publications from "./components/Publications"
import Achievements from "./components/Achievements"
import Skills from "./components/Skills"
import ResearchExperiences from "./components/ResearchExperiences"
import OrganizationalExperiences from "./components/OrganizationalExperiences"

export default function Home() {
  return (
    <div className="min-h-screen pb-12 space-y-3">
      <Hero />
      <div className="flex flex-col md:flex-row justify-between gap-4 max-w-[1110px] mx-auto px-4">
        <Thoughts />
      </div>
      <Publications />
      <Achievements />
      <Skills />
      <div className="flex flex-col md:flex-row justify-between gap-4 max-w-[1110px] mx-auto px-4">
        <ResearchExperiences />
        <OrganizationalExperiences />
      </div>
    </div>
  )
}

