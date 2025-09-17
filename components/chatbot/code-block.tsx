"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  content: string
}

export function CodeBlock({ content }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  // Extract code from markdown code blocks
  const codeMatch = content.match(/```(\w+)?\n([\s\S]*?)```/)
  const language = codeMatch?.[1] || "text"
  const code = codeMatch?.[2] || content

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <div className="space-y-2">
      {/* Text before code block */}
      {content.split("```")[0].trim() && (
        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{content.split("```")[0].trim()}</p>
      )}

      {/* Code block */}
      <div className="relative bg-muted rounded-lg overflow-hidden max-w-full">
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
          <span className="text-xs font-medium text-muted-foreground uppercase">{language}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard}>
            <motion.div
              key={copied ? "check" : "copy"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
            </motion.div>
          </Button>
        </div>
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <pre className="p-4 text-sm">
            <code
              className={cn(
                "font-mono text-foreground whitespace-pre",
                language === "javascript" && "text-blue-600",
                language === "python" && "text-green-600",
                language === "html" && "text-orange-600",
              )}
            >
              {code}
            </code>
          </pre>
        </div>
      </div>

      {/* Text after code block */}
      {content.split("```")[2]?.trim() && (
        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{content.split("```")[2].trim()}</p>
      )}
    </div>
  )
}
