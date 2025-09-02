export type Project = {
  slug: string
  title: string
  summary: string
  tags: string[]
  demo?: string
  repo?: string
}

export const projects: Project[] = [
  {
    slug: "taskflow",
    title: "TaskFlow - Team Task Manager",
    summary: "Real-time collaboration with comments, Kanban, and analytics.",
    tags: ["MongoDB", "Express", "Next.js", "Node", "WebSockets"],
    demo: "https://example.com/taskflow",
    repo: "https://github.com/you/taskflow",
  },
  {
    slug: "shop-mern",
    title: "Shop MERN - E-commerce",
    summary: "Full-stack store with cart, checkout, and admin dashboard.",
    tags: ["MongoDB", "Express", "React", "Node", "Stripe"],
    demo: "https://example.com/shop-mern",
    repo: "https://github.com/you/shop-mern",
  },
  {
    slug: "analytics-lite",
    title: "Analytics Lite",
    summary: "Privacy-friendly traffic insights with charts.",
    tags: ["Next.js", "Node", "Recharts", "Tailwind"],
    demo: "https://example.com/analytics-lite",
    repo: "https://github.com/you/analytics-lite",
  },
  {
    slug: "chat-lite",
    title: "Chat Lite",
    summary: "Minimal chat UI demo using front-end only logic.",
    tags: ["React", "Tailwind", "shadcn/ui"],
    demo: "https://example.com/chat-lite",
    repo: "https://github.com/you/chat-lite",
  },
]
