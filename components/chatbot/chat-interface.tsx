"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Paperclip, Mic, MicOff, ImageIcon, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  type: "text" | "code" | "image" | "video" | "file"
  sender: "user" | "ai"
  timestamp: Date
  fileName?: string
  fileSize?: string
}

interface ChatInterfaceProps {
  isFullscreen?: boolean
}

export function ChatInterface({ isFullscreen = false }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      type: "text",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    let aiResponse = ""
    let responseType: Message["type"] = "text"

    // Simple response logic based on user input
    if (userMessage.toLowerCase().includes("code") || userMessage.toLowerCase().includes("function")) {
      aiResponse = `Here's a simple JavaScript function:\n\n\`\`\`javascript\nfunction greetUser(name) {\n  return \`Hello, \${name}! Welcome to our AI assistant.\`;\n}\n\nconsole.log(greetUser('User'));\n\`\`\``
      responseType = "code"
    } else if (userMessage.toLowerCase().includes("image") || userMessage.toLowerCase().includes("picture")) {
      aiResponse = "I can help you with images! Here's a sample image for you:"
      responseType = "image"
    } else if (userMessage.toLowerCase().includes("video")) {
      aiResponse = "Here's a video response for you:"
      responseType = "video"
    } else {
      const responses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're asking. Here's my response:",
        "Great question! Based on what you've shared, I think...",
        "I'd be happy to help you with that. Here's what I suggest:",
        "That's a thoughtful inquiry. Let me provide you with some insights:",
      ]
      aiResponse =
        responses[Math.floor(Math.random() * responses.length)] +
        " " +
        "This is a simulated AI response that demonstrates the typing effect and message handling capabilities of our chatbot interface."
    }

    setIsTyping(false)

    const newMessage: Message = {
      id: Date.now().toString(),
      content: aiResponse,
      type: responseType,
      sender: "ai",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: "text",
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    await simulateAIResponse(inputValue)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileMessage: Message = {
      id: Date.now().toString(),
      content: `Uploaded file: ${file.name}`,
      type: "file",
      sender: "user",
      timestamp: new Date(),
      fileName: file.name,
      fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
    }

    setMessages((prev) => [...prev, fileMessage])

    // Simulate AI response to file
    setTimeout(() => {
      simulateAIResponse(`I uploaded a file: ${file.name}`)
    }, 500)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Here you would implement actual voice recording logic
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        const voiceMessage: Message = {
          id: Date.now().toString(),
          content: "Voice message recorded (simulated)",
          type: "text",
          sender: "user",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, voiceMessage])
        simulateAIResponse("voice message")
      }, 2000)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: `Dropped file: ${file.name}`,
        type: "file",
        sender: "user",
        timestamp: new Date(),
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
      }
      setMessages((prev) => [...prev, fileMessage])
      simulateAIResponse(`I dropped a file: ${file.name}`)
    }
  }

  return (
    <div
      className={cn("flex flex-col h-full bg-background relative", dragActive && "bg-accent/10")}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      <AnimatePresence>
        {dragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-accent/20 border-2 border-dashed border-accent rounded-lg flex items-center justify-center"
          >
            <div className="text-center">
              <FileText className="h-12 w-12 text-accent mx-auto mb-2" />
              <p className="text-lg font-medium text-accent">Drop files here to upload</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 min-h-0">
        <div className="space-y-4 pb-4">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {isTyping && <TypingIndicator />}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-card p-4 shrink-0">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="pr-20 min-h-[44px] resize-none"
              disabled={isTyping}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="*/*" />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => fileInputRef.current?.click()}
                disabled={isTyping}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", isRecording && "text-destructive")}
                onClick={toggleRecording}
                disabled={isTyping}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              {messages.some((message) => message.type === "image") && (
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isTyping}>
                  <ImageIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} className="h-11 px-4">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
            Recording... Click mic to stop
          </motion.div>
        )}
      </div>
    </div>
  )
}
