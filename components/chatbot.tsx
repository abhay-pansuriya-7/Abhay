"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MessageCircle, X } from "lucide-react"

type Message = { role: "user" | "assistant"; content: string }

const faqHints: { test: (t: string) => boolean; reply: string }[] = [
  {
    test: (t) => /stack|skills|tech|mern/i.test(t),
    reply:
      "I specialize in the MERN stack: MongoDB, Express.js, React (with Next.js), and Node.js. I also work with TypeScript, Tailwind, and shadcn/ui.",
  },
  {
    test: (t) => /project|portfolio|work|examples/i.test(t),
    reply:
      "You can explore selected projects on the Projects page. Each includes a summary, tech tags, and links to demo and code.",
  },
  {
    test: (t) => /hire|available|rate|budget|freelance/i.test(t),
    reply:
      "I’m currently available for select projects. Share your scope, timeline, and budget on the Contact page, and I’ll get back to you.",
  },
  {
    test: (t) => /contact|email|reach/i.test(t),
    reply: "The fastest way is email: you@example.com. Or book a quick intro call from the Contact page.",
  },
]

function getAssistantReply(input: string): string {
  const hit = faqHints.find((h) => h.test(input))
  if (hit) return hit.reply
  return "Thanks for the message! I’m a demo assistant (no backend). Ask about my stack, projects, or availability."
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I’m your portfolio assistant. How can I help?" },
  ])
  const [input, setInput] = useState("")
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  function send() {
    const trimmed = input.trim()
    if (!trimmed) return
    const userMsg: Message = { role: "user", content: trimmed }
    const botMsg: Message = { role: "assistant", content: getAssistantReply(trimmed) }
    setMessages((m) => [...m, userMsg, botMsg])
    setInput("")
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {open && (
          <div className="animate-pop-in w-[min(92vw,420px)] rounded-lg border bg-background shadow-xl overflow-hidden">
            <div className="border-b px-3 py-2 flex items-center justify-between">
              <p className="text-sm font-medium">Portfolio Assistant</p>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="p-1 rounded hover:bg-muted/20 transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </button>
            </div>
            <div ref={listRef} className="h-80 overflow-y-auto px-3 py-3 space-y-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[80%] rounded px-3 py-2 text-sm",
                    m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted/20 text-foreground",
                  )}
                >
                  {m.content}
                </div>
              ))}
            </div>
            <div className="border-t p-2 flex items-center gap-2">
              <input
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Ask about my stack, projects, availability..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                aria-label="Chat input"
              />
              <Button onClick={send} size="sm">
                Send
              </Button>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Hide chat" : "Open chat"}
          className={cn(
            "relative inline-flex h-16 w-16 items-center justify-center rounded-full",
            "bg-primary text-primary-foreground shadow-lg ring-1 ring-black/0",
            "transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "hover:scale-105 active:scale-95",
            !open && "chat-glow", // glow only when closed
          )}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <>
              <MessageCircle className="h-7 w-7" aria-hidden="true" />
              <span
                className="absolute -bottom-2 right-1 rounded-full bg-background/80 px-2 py-1 shadow-sm border"
                aria-hidden="true"
              >
                <span className="typing-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </span>
            </>
          )}
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
