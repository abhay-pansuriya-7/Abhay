"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {  User, FileText, ImageIcon, Video, SparklesIcon } from "lucide-react"
import { TypewriterText } from "./typewriter-text"
import { CodeBlock } from "./code-block"

interface Message {
  id: string
  content: string
  type: "text" | "code" | "image" | "video" | "file"
  sender: "user" | "ai"
  timestamp: Date
  fileName?: string
  fileSize?: string
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user"
  const isAI = message.sender === "ai"

  const renderContent = () => {
    switch (message.type) {
      case "code":
        return <CodeBlock content={message.content} />
      case "image":
        return (
          <div className="space-y-2">
            <TypewriterText text={message.content} />
            <div className="bg-muted rounded-lg p-4 border-2 border-dashed">
              <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground text-center">Sample Image Placeholder</p>
            </div>
          </div>
        )
      case "video":
        return (
          <div className="space-y-2">
            <TypewriterText text={message.content} />
            <div className="bg-muted rounded-lg p-4 border-2 border-dashed">
              <Video className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground text-center">Sample Video Placeholder</p>
            </div>
          </div>
        )
      case "file":
        return (
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <FileText className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{message.fileName}</p>
              <p className="text-xs text-muted-foreground">{message.fileSize}</p>
            </div>
          </div>
        )
      default:
        return isAI ? (
          <TypewriterText text={message.content} />
        ) : (
          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8,
      }}
      className={cn("flex gap-3 max-w-[85%]", isUser ? "ml-auto flex-row-reverse" : "mr-auto")}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={cn("text-xs", isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground")}
        >
          {isUser ? <User className="h-4 w-4" /> : <SparklesIcon className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "rounded-2xl px-4 py-3 shadow-sm border min-w-0 max-w-full",
          isUser ? "bg-primary text-primary-foreground rounded-br-md" : "bg-card text-card-foreground rounded-bl-md",
        )}
      >
        <div className="overflow-hidden">{renderContent()}</div>

        <div className={cn("text-xs mt-2 opacity-70", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  )
}
