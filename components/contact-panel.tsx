"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Button from "@/components/ui/button"

export function ContactPanel() {
  const email = "you@example.com"
  const subject = "Project inquiry from your portfolio"
  const body =
    "Hi Abhay ,%0D%0A%0D%0AI'd like to discuss a project. Here are a few details:%0D%0A- Scope:%0D%0A- Timeline:%0D%0A- Budget:%0D%0A%0D%0AThanks!"
  const mailtoHref = useMemo(() => `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`, [email])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>Prefer async? Send me an email and I’ll reply within 1-2 business days.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <Button asChild>
            <a href={mailtoHref}>Email me</a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calendly</CardTitle>
          <CardDescription>Want to chat live? Book a quick intro call.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">15–30 min intro</p>
          <Button asChild variant="outline">
            <a href="https://calendly.com/" target="_blank" rel="noreferrer">
              Book a call
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
