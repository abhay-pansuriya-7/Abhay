"use client"

import { usePathname } from "next/navigation"
import { Chatbot } from "./chatbot"

export function ChatbotWrapper() {
  const pathname = usePathname()
  
  // Don't render chatbot on /chat page
  if (pathname === "/chat") {
    return null
  }
  
  return <Chatbot />
}