"use client"

import { useEffect, useState, useCallback, useRef } from "react"

interface VoiceNavigationOptions {
  onNavigate: (section: string) => void
  onToggleTheme: () => void
  onOpenContact: () => void
  isDark: boolean
}

interface VoiceCommand {
  patterns: string[]
  action: string
  description: string
}

const voiceCommands: VoiceCommand[] = [
  {
    patterns: ["go to home", "navigate to home", "show home", "home page", "go home"],
    action: "navigate:home",
    description: "Navigate to home section",
  },
  {
    patterns: ["go to projects", "show projects", "navigate to projects", "view projects", "projects section"],
    action: "navigate:projects",
    description: "Navigate to projects section",
  },
  {
    patterns: ["go to experience", "show experience", "navigate to experience", "view experience", "work experience"],
    action: "navigate:experience",
    description: "Navigate to experience section",
  },
  {
    patterns: ["go to skills", "show skills", "navigate to skills", "view skills", "skills section"],
    action: "navigate:skills",
    description: "Navigate to skills section",
  },
  {
    patterns: ["go to contact", "show contact", "contact form", "navigate to contact", "contact me", "get in touch"],
    action: "navigate:contact",
    description: "Navigate to contact section",
  },
  {
    patterns: ["toggle theme", "switch theme", "dark mode", "light mode", "change theme"],
    action: "toggle:theme",
    description: "Toggle between dark and light theme",
  },
  {
    patterns: ["download cv", "download resume", "get cv", "get resume"],
    action: "download:cv",
    description: "Download CV/Resume",
  },
  {
    patterns: ["open github", "view github", "github profile"],
    action: "open:github",
    description: "Open GitHub profile",
  },
  {
    patterns: ["open linkedin", "view linkedin", "linkedin profile"],
    action: "open:linkedin",
    description: "Open LinkedIn profile",
  },
  {
    patterns: ["help", "voice commands", "what can you do", "voice help"],
    action: "show:help",
    description: "Show available voice commands",
  },
]

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function useVoiceNavigation({ onNavigate, onToggleTheme, onOpenContact, isDark }: VoiceNavigationOptions) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [lastCommand, setLastCommand] = useState("")
  const [showHelp, setShowHelp] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<"granted" | "denied" | "prompt" | "unknown">("unknown")
  const [error, setError] = useState<string>("")
  const [isInitialized, setIsInitialized] = useState(false)

  const recognitionRef = useRef<any>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Check browser support and initialize
  useEffect(() => {
    const initializeVoiceRecognition = async () => {
      if (typeof window === "undefined") return

      // Check if speech recognition is supported
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (!SpeechRecognition) {
        setIsSupported(false)
        setError("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.")
        return
      }

      setIsSupported(true)

      // Check if we're on HTTPS or localhost (required for microphone access)
      const isSecureContext =
        window.location.protocol === "https:" ||
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"

      if (!isSecureContext) {
        setError("Voice commands require HTTPS. Please access the site via HTTPS.")
        return
      }

      // Check microphone permissions
      try {
        if (navigator.permissions) {
          const permission = await navigator.permissions.query({ name: "microphone" as PermissionName })
          setPermissionStatus(permission.state)

          permission.addEventListener("change", () => {
            setPermissionStatus(permission.state)
          })
        } else {
          setPermissionStatus("prompt")
        }
      } catch (err) {
        console.log("Permission API not supported, will request permission on first use")
        setPermissionStatus("prompt")
      }

      // Initialize speech recognition
      try {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-US"
        recognition.maxAlternatives = 1

        recognition.onstart = () => {
          console.log("Voice recognition started")
          setIsListening(true)
          setTranscript("")
          setError("")
        }

        recognition.onresult = (event: any) => {
          const result = event.results[0][0].transcript.toLowerCase().trim()
          console.log("Voice input received:", result)
          setTranscript(result)
          processVoiceCommand(result)
        }

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)

          switch (event.error) {
            case "not-allowed":
              setError("Microphone access denied. Please allow microphone access and try again.")
              setPermissionStatus("denied")
              break
            case "no-speech":
              setError("No speech detected. Please try speaking again.")
              break
            case "audio-capture":
              setError("No microphone found. Please check your microphone connection.")
              break
            case "network":
              setError("Network error. Please check your internet connection.")
              break
            case "service-not-allowed":
              setError("Speech service not allowed. Please check your browser settings.")
              break
            default:
              setError(`Speech recognition error: ${event.error}`)
          }
        }

        recognition.onend = () => {
          console.log("Voice recognition ended")
          setIsListening(false)
        }

        recognitionRef.current = recognition
        setIsInitialized(true)
      } catch (err) {
        console.error("Error initializing speech recognition:", err)
        setError("Failed to initialize voice recognition.")
      }
    }

    initializeVoiceRecognition()
  }, [])

  const processVoiceCommand = useCallback(
    (command: string) => {
      const matchedCommand = voiceCommands.find((cmd) =>
        cmd.patterns.some((pattern) => {
          const patternWords = pattern.split(" ")
          const commandWords = command.split(" ")

          // Check if all pattern words are present in the command
          return patternWords.every((word) =>
            commandWords.some((cmdWord) => cmdWord.includes(word) || word.includes(cmdWord)),
          )
        }),
      )

      if (matchedCommand) {
        setLastCommand(command)
        const [action, target] = matchedCommand.action.split(":")

        // Clear last command after 3 seconds
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setLastCommand(""), 3000)

        switch (action) {
          case "navigate":
            onNavigate(target)
            speak(`Navigating to ${target} section`)
            break
          case "toggle":
            if (target === "theme") {
              onToggleTheme()
              speak(`Switched to ${isDark ? "light" : "dark"} mode`)
            }
            break
          case "download":
            if (target === "cv") {
              downloadCV()
              speak("Downloading CV")
            }
            break
          case "open":
            if (target === "github") {
              window.open("https://github.com/YourNewUsername", "_blank")
              speak("Opening GitHub profile")
            } else if (target === "linkedin") {
              window.open("https://www.linkedin.com/feed/", "_blank")
              speak("Opening LinkedIn profile")
            }
            break
          case "show":
            if (target === "help") {
              setShowHelp(true)
              speak("Showing voice commands help")
            }
            break
        }
      } else {
        speak("Sorry, I didn't understand that command. Say 'help' to see available commands.")
        setError("Command not recognized. Try saying 'help' for available commands.")
        setTimeout(() => setError(""), 3000)
      }
    },
    [onNavigate, onToggleTheme, isDark],
  )

  const downloadCV = () => {
    try {
      const link = document.createElement("a")
      link.href = "/cv/Lalesh_Pawar_CV.txt"
      link.download = "Lalesh_Pawar_CV.txt"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Error downloading CV:", err)
      speak("Sorry, there was an error downloading the CV")
    }
  }

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      utterance.lang = "en-US"

      speechSynthesis.speak(utterance)
    }
  }

  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      console.log("Requesting microphone permission...")

      // First try to get user media to trigger permission prompt
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      console.log("Microphone permission granted")

      // Stop the stream immediately as we only needed it for permission
      stream.getTracks().forEach((track) => {
        track.stop()
      })

      setPermissionStatus("granted")
      setError("")
      return true
    } catch (err: any) {
      console.error("Microphone permission denied:", err)

      if (err.name === "NotAllowedError") {
        setError(
          "Microphone access denied. Please click the microphone icon in your browser's address bar and allow access.",
        )
      } else if (err.name === "NotFoundError") {
        setError("No microphone found. Please connect a microphone and try again.")
      } else if (err.name === "NotSupportedError") {
        setError("Microphone access not supported in this browser.")
      } else {
        setError("Failed to access microphone. Please check your browser settings.")
      }

      setPermissionStatus("denied")
      return false
    }
  }

  const startListening = useCallback(async () => {
    if (!recognitionRef.current || isListening || !isInitialized) {
      console.log("Cannot start listening:", {
        hasRecognition: !!recognitionRef.current,
        isListening,
        isInitialized,
      })
      return
    }

    console.log("Attempting to start listening...")

    // Check and request permissions if needed
    if (permissionStatus === "denied") {
      setError("Microphone access denied. Please enable microphone access in your browser settings.")
      return
    }

    if (permissionStatus === "prompt" || permissionStatus === "unknown") {
      console.log("Requesting microphone permission...")
      const hasPermission = await requestMicrophonePermission()
      if (!hasPermission) {
        return
      }
    }

    try {
      setError("")
      console.log("Starting speech recognition...")
      recognitionRef.current.start()
    } catch (error: any) {
      console.error("Error starting recognition:", error)

      if (error.name === "InvalidStateError") {
        setError("Speech recognition is already running. Please wait and try again.")
      } else {
        setError("Failed to start voice recognition. Please try again.")
      }
    }
  }, [isListening, permissionStatus, isInitialized])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      console.log("Stopping speech recognition...")
      recognitionRef.current.stop()
    }
  }, [isListening])

  const toggleListening = useCallback(() => {
    console.log("Toggle listening:", { isListening, isSupported, isInitialized })

    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort()
        } catch (err) {
          console.log("Error aborting recognition:", err)
        }
      }
    }
  }, [])

  return {
    isListening,
    isSupported,
    transcript,
    lastCommand,
    showHelp,
    setShowHelp,
    startListening,
    stopListening,
    toggleListening,
    voiceCommands,
    permissionStatus,
    error,
    isInitialized,
  }
}
