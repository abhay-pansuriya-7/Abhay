"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Button from "@/components/ui/button"
import Icon from "./AppIcon"

export function ContactPanel() {
  const email = "you@example.com"
  const subject = "Project inquiry from your portfolio"
  const body =
    "Hi Abhay ,%0D%0A%0D%0AI'd like to discuss a project. Here are a few details:%0D%0A- Scope:%0D%0A- Timeline:%0D%0A- Budget:%0D%0A%0D%0AThanks!"
  const mailtoHref = useMemo(() => `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`, [email])

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={20} className="text-primary" />
              </div>
              <div>Email</div>
            </CardTitle>
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
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Phone" size={20} className="text-primary" />
              </div>
              <div>Phone Call</div>
            </CardTitle>
            <CardDescription>Available Mon-Fri, 9AM-6PM IST</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">+91 76985 76889</p>

            <Button asChild>
              <a href={`tel:+91 76985 76889`}>Call me</a>
            </Button>
          </CardContent>
        </Card>

      </div >
      <div className="flex justify-center mt-15 space-x-8">
        <a
          href="https://www.linkedin.com/in/abhay-pansuriya-7815701ab/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
        >
          <Icon name="Linkedin" size={20} />
        </a>
        <a
          href="https://github.com/abhay-pansuriya-7"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
        >
          <Icon name="Github" size={20} />
        </a>
        <a
          href="https://x.com/Abhay_D_P"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
        >
          <Icon name="Twitter" size={20} />
        </a>
      </div>

    </div>

  )
}
