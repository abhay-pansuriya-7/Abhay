import Link from "next/link"
import { ProjectsGrid } from "./projects-grid"
import Button from "@/components/ui/button"

export function ProjectsPreview() {
  return (
    <section className="px-6 md:px-8 lg:px-10 py-12 md:py-16">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Selected Work</h2>
            <p className="text-muted-foreground">A quick look at recent builds.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/projects">See all</Link>
          </Button>
        </div>
        <ProjectsGrid limit={3} />
      </div>
    </section>
  )
}
