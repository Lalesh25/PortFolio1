"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/YourNewUsername", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/feed/", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "mailto:laleshpawar2025@gmail.com", label: "Email" },
]

interface FooterProps {
  isDark: boolean
}

export default function Footer({ isDark }: FooterProps) {
  const textColor = isDark ? "text-white/70" : "text-gray-600"
  const textSecondary = isDark ? "text-white/50" : "text-gray-500"
  const borderColor = isDark ? "border-white/10" : "border-gray-200"
  const socialBg = isDark
    ? "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-purple-400/50"
    : "bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-purple-400/50"

  return (
    <footer className={`py-12 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0"
          >
            <p className={`${textColor} flex items-center`}>
              Made with <Heart className="w-4 h-4 mx-2 text-red-400" /> by Lalesh Pawar
            </p>
            <p className={`${textSecondary} text-sm mt-1`}>© {new Date().getFullYear()} All rights reserved.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : "_self"}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${socialBg}`}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
