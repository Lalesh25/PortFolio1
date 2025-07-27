"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import SkillsSimple from "@/components/skills-simple"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"

export default function Home() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-black" : "bg-white"}`}>
      <Navigation isDark={isDark} setIsDark={setIsDark} />
      <Hero isDark={isDark} />
      <Projects isDark={isDark} />
      <Experience isDark={isDark} />
      <SkillsSimple isDark={isDark} />
      <Contact isDark={isDark} />
      <Footer isDark={isDark} />
      <Chatbot isDark={isDark} />
    </div>
  )
}
