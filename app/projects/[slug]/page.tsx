import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const p = projects.find((x) => x.slug === slug)
  if (!p) return {}
  return {
    title: `${p.title} — Projects`,
    description: p.summary,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return notFound()

  return (
    <main className="min-h-dvh flex flex-col">
      <SiteHeader />
      <section className="px-6 md:px-8 lg:px-10 py-10 md:py-14 border-b">
        <div className="max-w-5xl mx-auto space-y-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/projects" className="hover:underline">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                {project.title}
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-semibold text-pretty">{project.title}</h1>
          <p className="text-muted-foreground max-w-3xl">{project.summary}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="text-xs rounded-md border px-2 py-1 bg-muted text-foreground">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.demo && (
              <Button asChild>
                <Link href={project.demo} target="_blank" rel="noreferrer">
                  View Live
                </Link>
              </Button>
            )}
            {project.repo && (
              <Button asChild variant="outline">
                <Link href={project.repo} target="_blank" rel="noreferrer">
                  View Code
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
          <div className="aspect-video relative rounded-lg overflow-hidden border">
            <Image
              src="/abstract-project-cover.png"
              alt={`${project.title} cover`}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">Overview</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              This page is a static detail generated from local data. Replace this copy with real project context: the
              problem, your approach, and the impact. Add screens, notes on architecture, and key learnings.
            </p>
            <h3 className="text-lg md:text-xl font-semibold">Highlights</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-foreground">
              <li>Clean, modular architecture with the MERN stack</li>
              <li>Focus on performance, accessibility, and DX</li>
              <li>Deployed and battle-tested where applicable</li>
            </ul>
          </section>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
