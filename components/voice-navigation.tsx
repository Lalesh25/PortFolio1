"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mic, MicOff, Volume2, HelpCircle, X, Zap, MessageSquare, AlertTriangle, Settings, Loader2 } from "lucide-react"
import { useVoiceNavigation } from "@/hooks/use-voice-navigation"

interface VoiceNavigationProps {
  isDark: boolean
  onNavigate: (section: string) => void
  onToggleTheme: () => void
  onOpenContact: () => void
}

export default function VoiceNavigation({ isDark, onNavigate, onToggleTheme, onOpenContact }: VoiceNavigationProps) {
  const {
    isListening,
    isSupported,
    transcript,
    lastCommand,
    showHelp,
    setShowHelp,
    toggleListening,
    voiceCommands,
    permissionStatus,
    error,
    isInitialized,
  } = useVoiceNavigation({
    onNavigate,
    onToggleTheme,
    onOpenContact,
    isDark,
  })

  const buttonBg = isDark
    ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
    : "bg-black/10 border-gray-300 text-gray-700 hover:bg-black/20"

  const cardBg = isDark ? "bg-slate-900/95 border-white/20" : "bg-white/95 border-gray-200"

  const getButtonColor = () => {
    if (!isSupported) {
      return "bg-gray-500 hover:bg-gray-600 text-white border-gray-400 opacity-50 cursor-not-allowed"
    }
    if (!isInitialized) {
      return "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-400"
    }
    if (permissionStatus === "denied") {
      return "bg-red-500 hover:bg-red-600 text-white border-red-400"
    }
    if (isListening) {
      return "bg-red-500 hover:bg-red-600 text-white border-red-400"
    }
    return "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-purple-400"
  }

  const getButtonIcon = () => {
    if (!isSupported) {
      return <MicOff className="w-6 h-6" />
    }
    if (!isInitialized) {
      return <Loader2 className="w-6 h-6 animate-spin" />
    }
    if (permissionStatus === "denied") {
      return <Settings className="w-6 h-6" />
    }
    return isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />
  }

  const getButtonTitle = () => {
    if (!isSupported) {
      return "Voice commands not supported in this browser"
    }
    if (!isInitialized) {
      return "Initializing voice recognition..."
    }
    if (permissionStatus === "denied") {
      return "Microphone access denied - Click to see help"
    }
    return isListening ? "Stop listening" : "Start voice commands"
  }

  const handleButtonClick = () => {
    if (!isSupported) {
      setShowHelp(true)
      return
    }
    if (!isInitialized) {
      return
    }
    if (permissionStatus === "denied") {
      setShowHelp(true)
      return
    }
    toggleListening()
  }

  return (
    <>
      {/* Voice Control Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center space-y-2">
          {/* Main Voice Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
            <Button
              onClick={handleButtonClick}
              className={`w-14 h-14 rounded-full backdrop-blur-sm transition-all duration-300 ${getButtonColor()}`}
              title={getButtonTitle()}
              disabled={!isSupported || !isInitialized}
            >
              {getButtonIcon()}
            </Button>

            {/* Listening Animation */}
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            )}

            {/* Pulse Effect */}
            {!isListening && isSupported && isInitialized && permissionStatus !== "denied" && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </motion.div>

          {/* Help Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHelp(true)}
            className={`backdrop-blur-sm transition-all duration-300 ${buttonBg}`}
            title="Show voice commands help"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>

          {/* Status Indicator */}
          <AnimatePresence>
            {(isListening || transcript || error || !isInitialized) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm max-w-48 text-center ${
                  error
                    ? isDark
                      ? "bg-red-500/20 text-red-300"
                      : "bg-red-100 text-red-700"
                    : !isInitialized
                      ? isDark
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-yellow-100 text-yellow-700"
                      : isListening
                        ? isDark
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                        : isDark
                          ? "bg-green-500/20 text-green-300"
                          : "bg-green-100 text-green-700"
                }`}
              >
                {error ? (
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span className="truncate">{error}</span>
                  </div>
                ) : !isInitialized ? (
                  <div className="flex items-center space-x-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Initializing...</span>
                  </div>
                ) : isListening ? (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span>Listening...</span>
                  </div>
                ) : transcript ? (
                  <div className="flex items-center space-x-1">
                    <Volume2 className="w-3 h-3" />
                    <span className="truncate">"{transcript}"</span>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`backdrop-blur-md rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto ${cardBg}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                    Voice Commands
                  </h3>
                  <p className={`${isDark ? "text-white/70" : "text-gray-600"}`}>
                    Use these voice commands to navigate the website
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowHelp(false)}
                  className={isDark ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-gray-700"}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Browser Support Alert */}
              {!isSupported && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Voice commands are not supported in this browser.</strong>
                    <br />
                    Please use one of these browsers for voice commands:
                    <br />• Chrome (Recommended) • Microsoft Edge • Safari (Limited support)
                  </AlertDescription>
                </Alert>
              )}

              {/* HTTPS Requirement Alert */}
              {isSupported &&
                typeof window !== "undefined" &&
                window.location.protocol !== "https:" &&
                window.location.hostname !== "localhost" && (
                  <Alert className="mb-6 border-orange-200 bg-orange-50">
                    <Settings className="h-4 w-4" />
                    <AlertDescription>
                      <strong>HTTPS Required:</strong> Voice commands require a secure connection. Please access this
                      site via HTTPS for voice features to work.
                    </AlertDescription>
                  </Alert>
                )}

              {/* Permission Denied Alert */}
              {permissionStatus === "denied" && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Microphone Access Required:</strong>
                    <br />
                    To enable voice commands:
                    <br />
                    1. Look for the microphone icon 🎤 in your browser's address bar
                    <br />
                    2. Click it and select "Always allow" for microphone access
                    <br />
                    3. Refresh the page and try again
                    <br />
                    <br />
                    <strong>Alternative:</strong> Go to your browser settings → Privacy & Security → Site Settings →
                    Microphone, and allow access for this site.
                  </AlertDescription>
                </Alert>
              )}

              {/* Troubleshooting Section */}
              {isSupported && (
                <div
                  className={`mb-6 p-4 rounded-lg border ${
                    isDark ? "bg-blue-500/10 border-blue-500/20" : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Mic className="w-5 h-5 text-blue-400" />
                    <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Troubleshooting Steps
                    </h4>
                  </div>
                  <ul className={`text-sm space-y-1 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    <li>• Make sure you're using Chrome, Edge, or Safari</li>
                    <li>• Ensure your microphone is connected and working</li>
                    <li>• Check that the site is accessed via HTTPS (secure connection)</li>
                    <li>• Allow microphone access when prompted</li>
                    <li>• Try refreshing the page if voice commands don't work</li>
                    <li>• Speak clearly and wait for the red listening indicator</li>
                  </ul>
                </div>
              )}

              {/* Voice Commands List */}
              {isSupported && (
                <div className="grid gap-4">
                  {voiceCommands.map((command, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                          {command.description}
                        </h4>
                        <div className="flex items-center space-x-1">
                          {command.action.includes("navigate") && <Zap className="w-4 h-4 text-blue-400" />}
                          {command.action.includes("toggle") && <Volume2 className="w-4 h-4 text-green-400" />}
                          {command.action.includes("open") && <MessageSquare className="w-4 h-4 text-purple-400" />}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {command.patterns.slice(0, 3).map((pattern, patternIndex) => (
                          <Badge
                            key={patternIndex}
                            variant="secondary"
                            className={`text-xs ${
                              isDark
                                ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                : "bg-purple-100 text-purple-700 border-purple-200"
                            }`}
                          >
                            "{pattern}"
                          </Badge>
                        ))}
                        {command.patterns.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{command.patterns.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* How to Use Section */}
              {isSupported && (
                <div
                  className={`mt-6 p-4 rounded-lg ${
                    isDark ? "bg-green-500/10 border-green-500/20" : "bg-green-50 border-green-200"
                  } border`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Volume2 className="w-5 h-5 text-green-400" />
                    <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>How to Use</h4>
                  </div>
                  <ul className={`text-sm space-y-1 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    <li>• Click the purple microphone button to start listening</li>
                    <li>• Allow microphone access when your browser prompts you</li>
                    <li>• Wait for the button to turn red (listening mode)</li>
                    <li>• Speak clearly using one of the commands above</li>
                    <li>• The system will provide audio feedback for successful commands</li>
                    <li>• Say "help" anytime to see this guide again</li>
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Last Command Display */}
      <AnimatePresence>
        {lastCommand && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-24 left-6 z-40"
          >
            <div
              className={`px-4 py-2 rounded-lg backdrop-blur-sm ${
                isDark
                  ? "bg-green-500/20 border-green-500/30 text-green-300"
                  : "bg-green-100 border-green-200 text-green-700"
              } border max-w-64`}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium truncate">Command: "{lastCommand}"</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
