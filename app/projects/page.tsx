import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProjectsGrid } from "@/components/projects-grid"

export default function ProjectsPage() {
  return (
    <main className="min-h-dvh flex flex-col">
      <SiteHeader />
      <section className="px-6 md:px-8 lg:px-10 py-12 md:py-16 border-b">
        <div className="max-w-5xl mx-auto space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold">Projects</h1>
          <p className="text-muted-foreground max-w-2xl">
            A selection of production-grade builds and experiments using MongoDB, Express, React, and Node.
          </p>
        </div>
      </section>
      <section className="px-6 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <ProjectsGrid />
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
