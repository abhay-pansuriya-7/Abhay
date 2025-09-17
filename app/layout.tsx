import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { ChatbotWrapper } from "@/components/chatbot/chatbot-wrapper"


export const metadata: Metadata = {
  title: "Abhay Pansuriya",
  description:
    "Expert web developer specializing in modern web technologies and building cutting-edge Generative AI applications.",
}

export default function RootLayout({ 
  children,
  modal
}: { 
  children: React.ReactNode
  modal: React.ReactNode 
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background text-foreground antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Suspense fallback={null}>
          {/* ThemeProvider handles attribute, storage and transitions internally */}
          <ThemeProvider>
            {children}
            {modal}
            
            <ChatbotWrapper />
            <Analytics />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
