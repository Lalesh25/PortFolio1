"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Database, Globe, Server, Wrench } from "lucide-react"

interface Skill {
  name: string
  level: number
  category: string
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: Skill[]
  color: string
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: <Globe className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React/Next.js", level: 95, category: "frontend" },
      { name: "HTML/CSS", level: 94, category: "frontend" },
      { name: "JavaScript", level: 92, category: "frontend" },
      { name: "Tailwind CSS", level: 88, category: "frontend" },
    ],
  },
  {
    title: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 85, category: "backend" },
      { name: "Python", level: 80, category: "backend" },
      { name: "Express.js", level: 82, category: "backend" },
      { name: "REST APIs", level: 88, category: "backend" },
    ],
  },
  {
    title: "Database & Cloud",
    icon: <Database className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "MongoDB", level: 85, category: "database" },
      { name: "PostgreSQL", level: 78, category: "database" },
      { name: "AWS", level: 75, category: "database" },
      { name: "Firebase", level: 80, category: "database" },
    ],
  },
  {
    title: "Data Science & AI",
    icon: <Database className="w-6 h-6" />,
    color: "from-green-500 to-blue-500",
    skills: [
      { name: "Pandas", level: 88, category: "datascience" },
      { name: "NumPy", level: 85, category: "datascience" },
      { name: "Matplotlib", level: 82, category: "datascience" },
      { name: "Seaborn", level: 80, category: "datascience" },
      { name: "Machine Learning", level: 82, category: "datascience" },
      { name: "Deep Learning", level: 78, category: "datascience" },
    ],
  },
  {
    title: "Tools & Others",
    icon: <Wrench className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git/GitHub", level: 90, category: "tools" },
      { name: "Docker", level: 70, category: "tools" },
      { name: "Figma", level: 75, category: "tools" },
      { name: "VS Code", level: 95, category: "tools" },
    ],
  },
]

const AnimatedCube = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="relative w-16 h-16 mx-auto mb-4"
      initial={{ rotateY: 0, rotateX: 0 }}
      animate={{
        rotateY: [0, 360],
        rotateX: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Cube faces */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-80 rounded-lg"
        style={{ transform: "translateZ(32px)" }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 opacity-80 rounded-lg"
        style={{ transform: "rotateY(90deg) translateZ(32px)" }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-600 opacity-80 rounded-lg"
        style={{ transform: "rotateY(180deg) translateZ(32px)" }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-600 opacity-80 rounded-lg"
        style={{ transform: "rotateY(-90deg) translateZ(32px)" }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-600 opacity-80 rounded-lg"
        style={{ transform: "rotateX(90deg) translateZ(32px)" }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-green-600 opacity-80 rounded-lg"
        style={{ transform: "rotateX(-90deg) translateZ(32px)" }}
      />
    </motion.div>
  )
}

const FloatingParticle = ({ index }: { index: number }) => {
  const x = Math.cos(index * 0.5) * 100
  const y = Math.sin(index * 0.3) * 80

  return (
    <motion.div
      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
      initial={{ x: x, y: y, scale: 0 }}
      animate={{
        x: x + Math.cos(index * 0.1) * 50,
        y: y + Math.sin(index * 0.1) * 30,
        scale: [0, 1, 0.5, 1],
      }}
      transition={{
        duration: 4 + index * 0.2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

interface SkillsSimpleProps {
  isDark: boolean
}

export default function SkillsSimple({ isDark }: SkillsSimpleProps) {
  return (
    <section
      id="skills"
      className={`py-20 relative overflow-hidden ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            A comprehensive overview of my technical skills and proficiency levels
          </p>
          <AnimatedCube delay={0.5} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card
                className={`h-full ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white/80 border-gray-200"} backdrop-blur-sm hover:shadow-xl transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mr-4`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <Badge
                            variant="secondary"
                            className={`${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}
                          >
                            {skill.level}%
                          </Badge>
                        </div>
                        <div className="relative">
                          <Progress value={0} className={`h-2 ${isDark ? "bg-gray-800" : "bg-gray-200"}`} />
                          <motion.div
                            className={`absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r ${category.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: categoryIndex * 0.1 + skillIndex * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
