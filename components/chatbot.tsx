"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface ChatbotProps {
  isDark: boolean
}

const botResponses = [
  "Hi! I'm Lalesh's AI assistant. How can I help you today?",
  "Thanks for your interest! Feel free to ask me about Lalesh's skills, projects, or experience.",
  "I'd be happy to help you learn more about Lalesh's work. What would you like to know?",
  "That's a great question! You can find more details in the portfolio sections above.",
  "Lalesh is passionate about full-stack development and AI. Would you like to know more about any specific project?",
  "For detailed discussions about projects or collaborations, feel free to use the contact form!",
  "Lalesh has experience with React, Node.js, Python, and machine learning. What interests you most?",
]

export default function Chatbot({ isDark }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm here to help you learn more about Lalesh Pawar. Feel free to ask me anything!",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("skill") || lowerMessage.includes("technology")) {
      return "Lalesh is skilled in React, Node.js, Python, C++, Machine Learning, and more! Check out the Skills section for the complete list."
    }
    if (lowerMessage.includes("project")) {
      return "Lalesh has worked on exciting projects like Devhub-Elearning Platform, Real Time Compiler, MathGenie AI Calculator, and AI Photo Editor. You can see more details in the Projects section!"
    }
    if (lowerMessage.includes("devhub") || lowerMessage.includes("elearning") || lowerMessage.includes("learning")) {
      return "Devhub is a comprehensive e-learning platform with course management, video playback, student portals, and rating systems. It's built with the MERN stack!"
    }
    if (lowerMessage.includes("compiler") || lowerMessage.includes("code")) {
      return "The Real Time Compiler is a web-based coding platform with live collaboration, multiple language support, and real-time syncing via WebSockets!"
    }
    if (lowerMessage.includes("mathgenie") || lowerMessage.includes("math") || lowerMessage.includes("calculator")) {
      return "MathGenie is an AI-powered calculator that solves math problems from your drawings! Just draw an equation and it will solve it with explanations."
    }
    if (lowerMessage.includes("photo") || lowerMessage.includes("editor") || lowerMessage.includes("image")) {
      return "The AI Photo Editor uses advanced AI features for background removal, object detection, style transfer, and automatic enhancements with real-time preview!"
    }
    if (lowerMessage.includes("experience") || lowerMessage.includes("work")) {
      return "Lalesh has experience with Goldman Sachs Virtual Software Engineering Program (Forage) and as an Internshala Student Partner (ISP). Check the Experience section for details!"
    }
    if (lowerMessage.includes("goldman") || lowerMessage.includes("sachs") || lowerMessage.includes("forage")) {
      return "At Goldman Sachs Virtual Program, Lalesh worked on IT security assessment, password hashing algorithms, and cybersecurity improvements using tools like Hashcat!"
    }
    if (lowerMessage.includes("internshala") || lowerMessage.includes("isp")) {
      return "As an Internshala Student Partner, Lalesh promoted programs at university, organized campus events, and enhanced leadership skills through student engagement campaigns!"
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("email")) {
      return "You can reach Lalesh at laleshpawar2025@gmail.com or use the contact form. Also check out the GitHub and LinkedIn profiles!"
    }
    if (lowerMessage.includes("education")) {
      return "Lalesh is pursuing B.TECH in Computer Science and Engineering from DBATU with a CGPA of 8.09."
    }
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! Great to meet you! I'm here to help you learn more about Lalesh's skills and projects. What would you like to know?"
    }

    return botResponses[Math.floor(Math.random() * botResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: generateBotResponse(inputValue),
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const chatBg = isDark ? "bg-slate-900/95 border-white/20" : "bg-white/95 border-gray-200"
  const messageBg = isDark ? "bg-white/10" : "bg-gray-100"
  const userMessageBg = isDark ? "bg-purple-600" : "bg-purple-500"
  const textColor = isDark ? "text-white" : "text-gray-900"
  const inputBg = isDark
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50"
    : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500"

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-96 md:w-96 md:h-[500px]"
          >
            <Card className={`h-full backdrop-blur-md border ${chatBg}`}>
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${textColor}`}>AI Assistant</h3>
                    <p className={`text-xs ${isDark ? "text-white/60" : "text-gray-500"}`}>Ask me about Lalesh</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className={isDark ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-gray-700"}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>

              <CardContent className="flex flex-col h-full p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%]`}>
                        {message.isBot && (
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div
                          className={`px-3 py-2 rounded-lg text-sm ${
                            message.isBot ? `${messageBg} ${textColor}` : `${userMessageBg} text-white`
                          }`}
                        >
                          {message.text}
                        </div>
                        {!message.isBot && (
                          <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className={`px-3 py-2 rounded-lg ${messageBg}`}>
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                              className={`w-2 h-2 rounded-full ${isDark ? "bg-white/60" : "bg-gray-400"}`}
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                              className={`w-2 h-2 rounded-full ${isDark ? "bg-white/60" : "bg-gray-400"}`}
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                              className={`w-2 h-2 rounded-full ${isDark ? "bg-white/60" : "bg-gray-400"}`}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className={`flex-1 ${inputBg}`}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.div className="fixed bottom-6 right-6 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </>
  )
}
