export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-10 h-16 flex items-center justify-between text-sm">
        <p className="text-muted-foreground">© {new Date().getFullYear()} Your Name</p>
        <p className="text-muted-foreground">Built with Next.js & Tailwind</p>
      </div>
    </footer>
  )
}
