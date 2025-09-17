"use client"

import { useRouter } from "next/navigation"
import { ChatInterface } from "./chat-interface"
import { motion } from "framer-motion"
import { X, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatFullscreen() {
  const router = useRouter()

  const handleClose = () => {
    router.push("/")
  }

  const handleMinimize = () => {
    router.back()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <h1 className="text-xl font-semibold text-card-foreground">AI Assistant - Ask me about Abhay</h1>
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon" onClick={handleMinimize} className="h-8 w-8">
            <Minimize2 className="h-4 w-4" />
          </Button> */}
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 cursor-pointer">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="h-[calc(100vh-73px)]">
        <ChatInterface isFullscreen />
      </div>
    </motion.div>
  )
}
