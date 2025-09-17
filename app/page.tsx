"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectsPreview } from "@/components/projects-preview"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Download, FileText } from "lucide-react"
import dynamic from 'next/dynamic';

const FloatingDotsBackground = dynamic(() => import('@/components/ui/canvasBG'), {
  ssr: false,
});

export default function HomePage() {
  // const handleDownloadResume = () => {
  //   const link = document.createElement("a")
  //   link.href = "/resume.pdf" // Assumes resume.pdf is in the public folder
  //   link.download = "Developer_Resume.pdf"
  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  // }
  return (
    <main className="min-h-dvh flex flex-col">
      <SiteHeader />
      <section className="relative px-6 md:px-8 lg:px-10 py-12 md:py-16 border-b overflow-hidden light-surface">
        {/* gradient aura */}
        <FloatingDotsBackground />

        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <p className="text-sm text-muted-foreground animate-fade-in-up [animation-delay:40ms]">Fullstack Web Engineer</p>
          <h1 className="text-3xl md:text-5xl font-semibold text-pretty animate-fade-in-up [animation-delay:80ms]">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              Abhay
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground w-full animate-fade-in-up [animation-delay:120ms]">
            I specialize in building high-performance, scalable, and secure web applications. With over 6 years of experience.
          </p>
          <p className="text-base md:text-lg text-muted-foreground w-full animate-fade-in-up [animation-delay:120ms]">
            I focus on delivering clean architecture, efficient code, and intuitive user experiences.
            Whether it's building robust backends, crafting responsive frontends, or integrating cutting-edge technologies, I thrive on solving complex problems and delivering value.
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
      {/* <div className="bg-card border rounded-lg p-8 max-w-md mx-auto mt-12">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Developer Resume</h2>
        <p className="text-muted-foreground mb-6">
          Download my professional resume to learn more about my skills and experience.
        </p>
        <Button onClick={handleDownloadResume} className="w-full" size="lg">
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </Button>
      </div> */}
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
    </main>
  )
}
