"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code2, Database, Brain, Wrench, Server } from "lucide-react"

interface SkillsSimpleProps {
  isDark: boolean
}

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code2 className="w-6 h-6" />,
    skills: [
      { name: "React/Next.js", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 94 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Three.js", level: 75 },
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 82 },
      { name: "Python", level: 88 },
      { name: "REST APIs", level: 90 },
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Database & Cloud",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "SQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "AWS", level: 75 },
      { name: "Docker", level: 70 },
    ],
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Data Science & AI",
    icon: <Brain className="w-6 h-6" />,
    skills: [
      { name: "Pandas", level: 88 },
      { name: "NumPy", level: 85 },
      { name: "Matplotlib", level: 82 },
      { name: "Seaborn", level: 80 },
      { name: "Machine Learning", level: 82 },
      { name: "Deep Learning", level: 78 },
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Tools & Others",
    icon: <Wrench className="w-6 h-6" />,
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "C++", level: 80 },
      { name: "Linux", level: 75 },
    ],
    color: "from-pink-500 to-rose-500",
  },
]

// Floating particles animation
const FloatingParticle = ({ delay, isDark }: { delay: number; isDark: boolean }) => (
  <motion.div
    className={`absolute w-2 h-2 rounded-full ${isDark ? "bg-white/20" : "bg-gray-400/30"}`}
    initial={{
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0,
    }}
    animate={{
      x: Math.random() * 200,
      y: Math.random() * 200,
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  />
)

// 3D rotating cube component
const RotatingCube = ({ isDark }: { isDark: boolean }) => (
  <div className="relative w-16 h-16 mx-auto mb-4">
    <motion.div
      className="w-full h-full relative preserve-3d"
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Cube faces */}
      {[
        { transform: "rotateY(0deg) translateZ(32px)", bg: "bg-blue-500/80" },
        { transform: "rotateY(90deg) translateZ(32px)", bg: "bg-green-500/80" },
        { transform: "rotateY(180deg) translateZ(32px)", bg: "bg-purple-500/80" },
        { transform: "rotateY(-90deg) translateZ(32px)", bg: "bg-orange-500/80" },
        { transform: "rotateX(90deg) translateZ(32px)", bg: "bg-pink-500/80" },
        { transform: "rotateX(-90deg) translateZ(32px)", bg: "bg-cyan-500/80" },
      ].map((face, index) => (
        <div
          key={index}
          className={`absolute w-16 h-16 ${face.bg} border border-white/20`}
          style={{ transform: face.transform }}
        />
      ))}
    </motion.div>
  </div>
)

export default function SkillsSimple({ isDark }: SkillsSimpleProps) {
  return (
    <section id="skills" className={`py-20 relative overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}>
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} isDark={isDark} />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <RotatingCube isDark={isDark} />
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Technical Skills
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            A comprehensive overview of my technical expertise across various domains
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white/80 border-gray-200 hover:bg-white"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>{category.icon}</div>
                    <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            {skill.name}
                          </span>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${isDark ? "bg-white/10 text-white/80" : "bg-gray-100 text-gray-700"}`}
                          >
                            {skill.level}%
                          </Badge>
                        </div>
                        <Progress value={skill.level} className={`h-2 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
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
