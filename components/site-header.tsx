"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-14 flex items-center justify-between">
        {/* Subtle gradient brand for a premium feel */}
        <Link href="/" className="font-semibold flex-shrink-0">
          <span className="bg-gradient-to-r from-[#824ff8be] to-[#9c6ef1] bg-clip-text text-transparent text-xl sm:text-2xl">
            {"<"}AP /{">"}
          </span>
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent/70 hover:text-accent-foreground",
                pathname === item.href ? "text-primary" : "text-foreground",
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Social icons - hidden on mobile */}
        <div className="hidden md:flex items-center gap-1.5">
          <a
            href="https://github.com/abhay-pansuriya-7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent hover:border-border hover:bg-accent transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/yourname"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent hover:border-border hover:bg-accent transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <Link
            href="/contact"
            aria-label="Contact"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent hover:border-border hover:bg-accent transition-colors"
          >
            <Mail className="h-4 w-4" />
          </Link>
          {/* <ThemeToggle /> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent hover:border-border hover:bg-accent transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="px-4 py-4 space-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 text-base rounded-md transition-colors hover:bg-accent/70 hover:text-accent-foreground",
                  pathname === item.href ? "text-primary bg-accent/50" : "text-foreground",
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t flex items-center gap-3">
              <a
                href="https://github.com/abhay-pansuriya-7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent hover:border-border hover:bg-accent transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/yourname"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent hover:border-border hover:bg-accent transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Contact"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent hover:border-border hover:bg-accent transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
