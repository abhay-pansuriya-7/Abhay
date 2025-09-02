import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactPanel } from "@/components/contact-panel"

export default function ContactPage() {
  return (
    <main className="min-h-dvh flex flex-col">
      <SiteHeader />
      <section className="px-6 md:px-8 lg:px-10 py-12 md:py-16 border-b">
        <div className="max-w-5xl mx-auto space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold">Contact</h1>
          <p className="text-muted-foreground max-w-2xl">
            I’m open to freelance work, contracts, and collaborations. The quickest way to reach me is via email.
          </p>
        </div>
      </section>
      <section className="px-6 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <ContactPanel />
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
