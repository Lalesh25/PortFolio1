"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Briefcase, Award } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Software Engineering Virtual Experience Program",
    company: "Goldman Sachs (Forage)",
    location: "Remote",
    period: "July 2024 - May 2024",
    description:
      "Completed a job simulation as a Goldman Sachs governance analyst responsible for assessing IT security and suggesting improvements. Identified that the company was using an outdated password hashing algorithm by cracking passwords using Hashcat. Wrote a memo for supervisors summarizing a range of proposed uplifts to increase the company's level of password protection including extending minimum password length and using a dedicated hashing algorithm.",
    technologies: ["Cybersecurity", "Hashcat", "Password Security", "Risk Assessment", "Technical Writing"],
    icon: Award,
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: 2,
    title: "Internshala Student Partner (ISP)",
    company: "Internshala",
    location: "Remote",
    period: "October 2024 - January 2025",
    description:
      "Promoted Internshala programs at university and built student engagement through campaigns. Enhanced leadership and communication skills by managing outreach and peer coordination. Successfully organized campus events and workshops to increase student participation in internship and training programs.",
    technologies: ["Leadership", "Event Management", "Marketing", "Communication", "Campus Outreach"],
    icon: Briefcase,
    color: "from-purple-400 to-pink-400",
  },
]

interface ExperienceProps {
  isDark: boolean
}

export default function Experience({ isDark }: ExperienceProps) {
  const textColor = isDark ? "text-white" : "text-gray-900"
  const textSecondary = isDark ? "text-white/70" : "text-gray-600"
  const cardBg = isDark
    ? "bg-white/5 border-white/10 hover:border-purple-400/50"
    : "bg-white/80 border-gray-200 hover:border-purple-400/50"

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className={`text-xl ${textSecondary} max-w-3xl mx-auto`}>My professional journey and career milestones</p>
        </motion.div>

        <div className="relative">
          {/* Modern Decorative Timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-1 hidden md:block">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-60" />

            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-400 via-pink-400 to-blue-400 rounded-full blur-sm opacity-40" />

            {/* Animated dots along the line */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-80"
            />
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-60"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Enhanced Timeline Node */}
                <div className="absolute left-4 top-8 hidden md:block">
                  {/* Outer glow ring */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                    className={`absolute inset-0 w-8 h-8 bg-gradient-to-r ${experience.color} rounded-full blur-md opacity-60`}
                  />

                  {/* Main node */}
                  <div
                    className={`relative w-8 h-8 bg-gradient-to-r ${experience.color} rounded-full flex items-center justify-center shadow-lg border-2 ${isDark ? "border-slate-900" : "border-white"}`}
                  >
                    <experience.icon className="w-4 h-4 text-white" />
                  </div>

                  {/* Inner pulse */}
                  <motion.div
                    animate={{ scale: [0.8, 1.1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                    className="absolute inset-1 bg-white/30 rounded-full"
                  />
                </div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="ml-0 md:ml-20"
                >
                  <Card
                    className={`backdrop-blur-sm transition-all duration-300 overflow-hidden ${cardBg} hover:shadow-2xl`}
                  >
                    {/* Card header with gradient accent */}
                    <div className={`h-1 bg-gradient-to-r ${experience.color}`} />

                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <experience.icon
                              className={`w-5 h-5 mr-2 text-transparent bg-gradient-to-r ${experience.color} bg-clip-text`}
                            />
                            <h3 className={`text-xl font-semibold ${textColor}`}>{experience.title}</h3>
                          </div>
                          <p
                            className={`font-medium bg-gradient-to-r ${experience.color} bg-clip-text text-transparent`}
                          >
                            {experience.company}
                          </p>
                        </div>

                        <div className="flex flex-col md:items-end mt-3 md:mt-0 space-y-2">
                          <div className={`flex items-center ${textSecondary} text-sm`}>
                            <Calendar className="w-4 h-4 mr-2" />
                            {experience.period}
                          </div>
                          <div className={`flex items-center ${textSecondary} text-sm`}>
                            <MapPin className="w-4 h-4 mr-2" />
                            {experience.location}
                          </div>
                        </div>
                      </div>

                      {/* Description with enhanced styling */}
                      <div className="relative">
                        <div
                          className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${experience.color} rounded-full opacity-30`}
                        />
                        <p className={`${textSecondary} mb-6 pl-4 leading-relaxed`}>{experience.description}</p>
                      </div>

                      {/* Enhanced technology badges */}
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge
                              variant="secondary"
                              className={`bg-gradient-to-r ${experience.color} bg-opacity-20 text-white border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm`}
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Decorative end element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute left-6 bottom-0 hidden md:block"
          >
            <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60" />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
