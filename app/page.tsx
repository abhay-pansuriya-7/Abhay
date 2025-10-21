"use client"
import Link from "next/link"
import Button from "@/components/ui/button"
import { ProjectsPreview } from "@/components/projects-preview"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Chatbot } from "@/components/chatbot"
import { ArrowRight } from "lucide-react"
import dynamic from 'next/dynamic';
import ProfileHero from "@/components/hero/components/ProfileHero"
import SkillsMatrix from "@/components/hero/components/SkillsMatrix"
import CallToAction from "@/components/hero/components/CallToAction"
import PersonalInterests from "@/components/hero/components/PersonalInterests"
import PersonalStory from "@/components/hero/components/PersonalStory"

const FloatingDotsBackground = dynamic(() => import('@/components/ui/canvasBG'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col">
      <SiteHeader />
      <section className="relative px-6 md:px-8 lg:px-10 py-12 md:py-16 border-b overflow-hidden light-surface">
        <FloatingDotsBackground />
        <ProfileHero />
      </section>
      <SkillsMatrix />
      <CallToAction />
      {/* <PersonalInterests /> */}
      <PersonalStory />
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
      {/* <Chatbot /> */}
    </main>
  )
}
