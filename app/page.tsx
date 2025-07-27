"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import SkillsSimple from "@/components/skills-simple"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import VoiceNavigation from "@/components/voice-navigation"

export default function Home() {
  const [isDark, setIsDark] = useState(false)

  // Apply dark class to <html> when theme changes
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const effectiveDark = savedTheme
      ? savedTheme === "dark"
      : prefersDark

    setIsDark(effectiveDark)
    document.documentElement.classList.toggle("dark", effectiveDark)
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    localStorage.setItem("theme", newTheme ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newTheme)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleNavigate = (section: string) => {
    scrollToSection(section)
  }

  const handleOpenContact = () => {
    scrollToSection("contact")
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-black" : "bg-white"}`}>
        <Navigation isDark={isDark} onToggleTheme={toggleTheme} />

        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Hero isDark={isDark} />
          <Projects isDark={isDark} />
          <Experience isDark={isDark} />
          <SkillsSimple isDark={isDark} />
          <Contact isDark={isDark} />
        </motion.main>

        <Footer isDark={isDark} />
        <Chatbot isDark={isDark} />
        <VoiceNavigation
          isDark={isDark}
          onNavigate={handleNavigate}
          onToggleTheme={toggleTheme}
          onOpenContact={handleOpenContact}
        />
      </div>
    </ThemeProvider>
  )
}
