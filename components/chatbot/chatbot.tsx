"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { SparklesIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
type Message = { role: "user" | "assistant"; content: string }




export function Chatbot() {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [showDots, setShowDots] = useState(false)

  useEffect(() => {
    if (!open) {
      const interval = setInterval(() => {
        setShowDots((prev) => !prev)
      }, 2500) // Change every 2.5s
      return () => clearInterval(interval)
    }
  }, [open])

  const handleClick = () => {
    router.push("/chat")
  }


  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <button
          onClick={handleClick}
          aria-label={open ? "Hide chat" : "Open chat"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "relative inline-flex h-16 w-16 items-center justify-center rounded-full",
            "bg-primary text-primary-foreground shadow-lg ring-1 ring-black/0",
            "transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "hover:scale-105 active:scale-95",
            !open && "chat-glow", // glow only when closed
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="x"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </motion.div>
            ) : showDots ? (
              <motion.div
                key="dots"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.3 }}
              >
                <span className="typing-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <SparklesIcon className="h-7 w-7" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.8 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 bg-card border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
              >
                <p className="text-sm font-medium text-card-foreground">Ask me about Abhay</p>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="w-0 h-0 border-l-4 border-l-card border-y-4 border-y-transparent"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <span
            className="pointer-events-none absolute inset-0 rounded-full"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, color-mix(in oklab, var(--color-primary), transparent 60%), transparent 70%)",
            }}
          />
        </button>
      </div>
    </>
  )
}
