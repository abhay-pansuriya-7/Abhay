"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = (resolvedTheme || theme) === "dark"
  const next = isDark ? "light" : "dark"

  const handleToggle = () => {
    const root = document.documentElement
    // Add a temporary class that enables CSS transitions for a smoother theme change
    root.classList.add("theme-transition")
    // Ensure the class is applied before switching the theme
    requestAnimationFrame(() => {
      setTheme(next)
      // Remove the transition class after animation completes
      window.setTimeout(() => {
        root.classList.remove("theme-transition")
      }, 400)
    })
  }

  return (
    <button
      type="button"
      aria-label={`Activate ${next} mode`}
      onClick={handleToggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent hover:border-border hover:bg-accent transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      {!mounted ? (
        <Sun className="h-4 w-4 opacity-0" />
      ) : isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}
