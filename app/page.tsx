"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectsPreview } from "@/components/projects-preview"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Chatbot } from "@/components/chatbot"
import { ArrowRight } from "lucide-react"
import dynamic from 'next/dynamic';

const FloatingDotsBackground = dynamic(() => import('@/components/ui/canvasBG'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col">
      <SiteHeader />
      <section className="relative px-6 md:px-8 lg:px-10 py-12 md:py-16 border-b overflow-hidden light-surface">
        {/* gradient aura */}
        <FloatingDotsBackground />

        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <p className="text-sm text-muted-foreground animate-fade-in-up [animation-delay:40ms]">MERN Developer</p>
          <h1 className="text-3xl md:text-5xl font-semibold text-pretty animate-fade-in-up [animation-delay:80ms]">
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              Abhay
            </span>
            . I build fast, reliable web apps with MongoDB, Express, React, and Node.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl animate-fade-in-up [animation-delay:120ms]">
            I focus on performance, clean architecture, and great UX. Explore selected projects below or get in touch.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in-up [animation-delay:160ms]">
            <Button asChild>
              <Link href="/projects" className="inline-flex items-center gap-2">
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact" className="inline-flex items-center gap-2">
                Contact Me <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ProjectsPreview />

      <section className="px-6 md:px-8 lg:px-10 py-12 md:py-16 border-t">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6 flex-col md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-balance">Have a project in mind?</h2>
            <p className="text-muted-foreground">Let’s discuss how I can help build or scale your app.</p>
          </div>
          <Button asChild>
            <Link href="/contact">Start a conversation</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
      <Chatbot />
    </main>
  )
}
