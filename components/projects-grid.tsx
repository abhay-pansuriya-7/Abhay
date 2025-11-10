import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { projects } from "@/data/projects"
// import { Layers, Rocket, TerminalSquare } from "lucide-react" // add simple icons

export function ProjectsGrid({ limit }: { limit?: number }) {
  const list = typeof limit === "number" ? projects.slice(0, limit) : projects
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((p) => (
        <Card key={p.slug} className="card-elevate group relative overflow-hidden">
          {/* <div className="px-4 pt-4">
            <div
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg ring-1 ring-border"
              style={{
                background:
                  "radial-gradient(120% 120% at 30% 20%, color-mix(in oklab, var(--color-primary), transparent 85%), transparent 60%)",
              }}
            >
              {idx % 3 === 0 && <Rocket className="h-5 w-5 text-primary" aria-hidden="true" />}
              {idx % 3 === 1 && <Layers className="h-5 w-5 text-primary" aria-hidden="true" />}
              {idx % 3 === 2 && <TerminalSquare className="h-5 w-5 text-primary" aria-hidden="true" />}
            </div>
          </div> */}

          <CardHeader className="pb-2">
            <Link href={`/projects/${p.slug}`} className="hover:underline">
              <CardTitle className="text-base md:text-lg tracking-tight">{p.title}</CardTitle>
            </Link>
            <CardDescription className="text-sm text-muted-foreground">{p.summary}</CardDescription>
          </CardHeader>

          <CardContent className="mt-auto">
            <ul className="flex flex-wrap gap-2 text-[11px]">
              {p.tags.map((t) => (
                <li key={t} className="rounded-md border bg-muted/10 px-2 py-1 text-muted-foreground">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-4 text-sm">
              {p.demo && (
                <Link
                  href={p.demo}
                  className="text-primary hover:opacity-90 transition-opacity"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </Link>
              )}
              {p.repo && (
                <Link
                  href={p.repo}
                  className="text-primary hover:opacity-90 transition-opacity"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Link>
              )}
            </div>
          </CardContent>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              boxShadow:
                "inset 0 0 0 1px color-mix(in oklab, var(--color-primary), transparent 70%), 0 10px 30px -12px color-mix(in oklab, var(--color-primary), transparent 70%)",
            }}
          />
        </Card>
      ))}
    </div>
  )
}
