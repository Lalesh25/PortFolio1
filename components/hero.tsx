"use client"

import { useRef, useMemo } from "react"
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react"
import * as random from "maath/random/dist/maath-random.esm"

function Stars(props: any) {
  const ref = useRef<any>()
  const [sphere] = useMemo(() => [random.inSphere(new Float32Array(5000), { radius: 1.5 })], [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={props.isDark ? "#8b5cf6" : "#6366f1"}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

interface HeroProps {
  isDark: boolean
}

export default function Hero({ isDark }: HeroProps) {
  const scrollToProjects = () => {
    const element = document.querySelector("#projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const downloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = "/cv/Lalesh_Pawar_CV.txt"
    link.download = "Lalesh_Pawar_CV.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const textColor = isDark ? "text-white/80" : "text-gray-600"
  const iconBg = isDark
    ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
    : "bg-black/10 border-gray-300 text-gray-700 hover:bg-black/20"

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars isDark={isDark} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img src="rounded-photo.jpg"  alt="My photo" width={200} height={200}/>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Lalesh Pawar
            </span>
          </motion.h1>

          <motion.p
            className={`text-xl md:text-2xl ${textColor} mb-8 max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            MERN Stack Developer crafting digital experiences with modern technologies
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={downloadCV}
              className={`px-8 py-3 rounded-full transition-all duration-300 bg-transparent hover:scale-105 ${
                isDark
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { icon: Github, href: "https://github.com/YourNewUsername" },
              { icon: Linkedin, href: "https://www.linkedin.com/feed/" },
              { icon: Mail, href: "mailto:laleshpawar2025@gmail.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${iconBg}`}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={scrollToProjects}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className={`transition-colors duration-300 ${isDark ? "text-white/60 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
