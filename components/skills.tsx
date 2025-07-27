"use client"

import { useRef, Suspense } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useFrame, useThree } from "@react-three/fiber"

// Dynamically import Three.js components to avoid SSR issues
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false })

// 3D Rotating Cube Component - wrapped to avoid SSR
function RotatingCube({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<any>()
  const groupRef = useRef<any>()
  const { clock } = useThree()

  useFrame((state: any, delta: number) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={isDark ? "#8b5cf6" : "#6366f1"} transparent opacity={0.8} wireframe={false} />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2.1, 2.1, 2.1]} />
        <meshBasicMaterial color={isDark ? "#ec4899" : "#8b5cf6"} transparent opacity={0.2} wireframe={true} />
      </mesh>
      {/* Floating spheres around the cube */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 6) * 3,
            Math.sin((i * Math.PI * 2) / 6) * 3,
            Math.sin(Date.now() * 0.001 + i) * 0.5,
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color={isDark ? "#fbbf24" : "#f59e0b"}
            emissive={isDark ? "#fbbf24" : "#f59e0b"}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Create a fallback 3D visualization using CSS
function Fallback3D({ isDark }: { isDark: boolean }) {
  return (
    <div className="w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
      <div className="relative">
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className={`w-32 h-32 border-4 ${isDark ? "border-purple-400" : "border-purple-600"} transform-gpu`}
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div
          animate={{ rotateX: 360 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className={`absolute top-4 left-4 w-24 h-24 border-2 ${isDark ? "border-pink-400" : "border-pink-600"} opacity-60`}
        />
      </div>
    </div>
  )
}

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React/Next.js", level: 95 },
      { name: "JavaScript", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Three.js", level: 75 },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 88 },
      { name: "Python", level: 85 },
      { name: "SQL", level: 82 },
      { name: "MongoDB", level: 78 },
    ],
  },
  {
    title: "Programming & Tools",
    skills: [
      { name: "C++", level: 80 },
      { name: "Git/GitHub", level: 92 },
      { name: "VS Code", level: 95 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 70 },
    ],
  },
  {
    title: "Data Science & AI",
    skills: [
      { name: "NumPy", level: 85 },
      { name: "Pandas", level: 88 },
      { name: "Matplotlib", level: 82 },
      { name: "Seaborn", level: 80 },
      { name: "Machine Learning", level: 82 },
      { name: "Deep Learning", level: 78 },
    ],
  },
]

interface SkillsProps {
  isDark: boolean
}

export default function Skills({ isDark }: SkillsProps) {
  const textColor = isDark ? "text-white" : "text-gray-900"
  const textSecondary = isDark ? "text-white/70" : "text-gray-600"
  const cardBg = isDark
    ? "bg-white/5 border-white/10 hover:border-purple-400/50"
    : "bg-white/80 border-gray-200 hover:border-purple-400/50"

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className={`text-xl ${textSecondary} max-w-3xl mx-auto`}>Technologies and tools I work with</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className={`backdrop-blur-sm transition-all duration-300 h-full ${cardBg}`}>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-semibold ${textColor} mb-6 text-center`}>{category.title}</h3>
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.2 + skillIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`${isDark ? "text-white/90" : "text-gray-800"} font-medium`}>
                            {skill.name}
                          </span>
                          <span className="text-purple-300 text-sm">{skill.level}%</span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                          }}
                          viewport={{ once: true }}
                        >
                          <Progress value={skill.level} className={`h-2 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 3D Structure Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center items-center"
        >
          <div className="relative">
            {/* 3D Canvas with fallback */}
            {typeof window !== "undefined" ? (
              <Suspense fallback={<Fallback3D isDark={isDark} />}>
                <div className="w-80 h-80 md:w-96 md:h-96">
                  <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    <RotatingCube isDark={isDark} />
                  </Canvas>
                </div>
              </Suspense>
            ) : (
              <Fallback3D isDark={isDark} />
            )}

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-4 -right-4 w-8 h-8 border-2 border-purple-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-pink-400 rounded-full opacity-60"
            />

            {/* Floating Text */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <p className={`text-sm ${textSecondary} text-center font-medium`}>Interactive 3D Visualization</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Tech Stack Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
            <span className={`${textColor} font-semibold`}>Specialized in:</span>
            <div className="flex space-x-2">
              {["MongoDB", "Express.js", "React", "Node.js"].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
