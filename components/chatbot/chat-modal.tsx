"use client"

import { useRouter } from "next/navigation"
import { ChatInterface } from "./chat-interface"
import { motion } from "framer-motion"
import { X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatModal() {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  const handleFullscreen = () => {
    router.push("/chat")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-2xl h-[600px] bg-card rounded-lg shadow-2xl border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <h2 className="text-lg font-semibold text-card-foreground">AI Assistant</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleFullscreen} className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="h-[calc(600px-73px)]">
          <ChatInterface />
        </div>
      </motion.div>
    </div>
  )
}
