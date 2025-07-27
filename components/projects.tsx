"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, X } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Devhub-Elearning Platform",
    description: "A comprehensive e-learning platform with course management and student portal",
    longDescription:
      "A full-featured e-learning platform with separate admin and student login access, course management with upload and view capabilities, video playback functionality, OTP verification through email validation, course ratings and reviews, and a comprehensive feedback system. The website is fully responsive, ensuring optimal usability across all devices.",
    image: "/images/devhub-elearning.jpeg",
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "JWT", "Cloudinary"],
    liveUrl: "https://dev-hub-frontend-lw32.vercel.app/",
    githubUrl: "https://github.com/Lalesh25/DevHub-frontend",
  },
  {
    id: 2,
    title: "Real Time Compiler",
    description: "Web-based real-time code compiler with live collaboration features",
    longDescription:
      "A web-based real-time compiler built using the MERN stack and Monaco Editor with live code collaboration capabilities. Features integrated backend code execution, real-time syncing via WebSockets, support for multiple programming languages with secure execution environment, and collaborative coding sessions.",
    image: "/images/real-time-compiler.jpg",
    technologies: ["React", "Node.js", "MongoDB", "WebSocket", "Monaco Editor", "Docker"],
    liveUrl: "#",
    githubUrl: "https://github.com/Lalesh25/RealTimeCodeCompiler",
  },
  {
    id: 3,
    title: "MathGenie",
    description: "AI-powered calculator that solves math problems from drawings",
    longDescription:
      "An innovative AI-powered calculator that brings your drawings to life and solves mathematical problems using drawing recognition and natural language processing. Users can draw mathematical expressions, equations, or diagrams, and the AI will interpret and solve them with step-by-step explanations.",
    image: "/images/mathgenie-calculator.avif",
    technologies: ["Python", "React", "TensorFlow", "OpenCV", "Flask", "Canvas API"],
    liveUrl: "#",
    githubUrl: "https://github.com/Lalesh25/MathGenie-Calculator",
  },
  {
    id: 4,
    title: "AI Photo Editor",
    description: "Next-generation photo editor powered by AI with advanced editing features",
    longDescription:
      "An AI-powered photo editor built with Next.js that can be used to edit photos at the next level with the help of AI features, providing speed and accuracy. Features include intelligent background removal, object detection and editing, style transfer, automatic enhancement, and advanced filters with real-time preview.",
    image: "/images/ai-photo-editor.jpg",
    technologies: ["Next.js", "Fabric.js", "Tailwind CSS", "ImageKit", "Shadcn UI", "AI APIs"],
    liveUrl: "#",
    githubUrl: "https://github.com/Lalesh25/AI-Photo-Editor",
  },
]

interface ProjectsProps {
  isDark: boolean
}

export default function Projects({ isDark }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const cardBg = isDark
    ? "bg-white/5 border-white/10 hover:border-purple-400/50"
    : "bg-white/80 border-gray-200 hover:border-purple-400/50"
  const textColor = isDark ? "text-white" : "text-gray-900"
  const textSecondary = isDark ? "text-white/70" : "text-gray-600"
  const modalBg = isDark ? "bg-slate-900/90 border-white/20" : "bg-white/95 border-gray-200"
  const buttonOutline = isDark
    ? "border-white/30 text-white hover:bg-white/10 bg-transparent"
    : "border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"

  const handleLiveDemo = (url: string) => {
    if (url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const handleViewCode = (url: string) => {
    if (url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className={`text-xl ${textSecondary} max-w-3xl mx-auto`}>
            A showcase of my recent work and creative projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`group backdrop-blur-sm transition-all duration-300 overflow-hidden ${cardBg}`}>
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => setSelectedProject(project)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-semibold ${textColor} mb-2`}>{project.title}</h3>
                  <p className={`${textSecondary} mb-4`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className={buttonOutline}
                      onClick={() => handleLiveDemo(project.liveUrl)}
                      disabled={project.liveUrl === "#"}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={buttonOutline}
                      onClick={() => handleViewCode(project.githubUrl)}
                      disabled={project.githubUrl === "#"}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`backdrop-blur-md rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto ${modalBg}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-2xl font-bold ${textColor}`}>{selectedProject.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedProject(null)}
                    className={isDark ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-gray-700"}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className={`${textSecondary} mb-4`}>{selectedProject.longDescription}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => handleLiveDemo(selectedProject.liveUrl)}
                    disabled={selectedProject.liveUrl === "#"}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    className={buttonOutline}
                    onClick={() => handleViewCode(selectedProject.githubUrl)}
                    disabled={selectedProject.githubUrl === "#"}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
