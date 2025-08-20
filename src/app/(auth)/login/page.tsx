"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "@/lib/useTranslations"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loginWith, setLoginWith] = useState("email")
  const [email, setEmail] = useState("")
  const router = useRouter()
  const t = useTranslations('login')
  const g = useTranslations()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      
    } catch (error) {
      console.error("Login error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    setLoginWith(value as "email" | "phone")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{t('welcome')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs value={loginWith} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">{g("common.email")}</TabsTrigger>
                <TabsTrigger value="phone">{g("common.phone")}</TabsTrigger>
                </TabsList>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <TabsContent value="email" className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex">
                          <Input
                            id="email"
                            type="text"
                            placeholder="your-email@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={loginWith === "email" ? true : false}
                            maxLength={9}
                          />
                        </div>
                      </div>
                  </TabsContent> 

                  <TabsContent value="phone" className="space-y-6">
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="phone">{g('common.phone')}</Label>
                        <div className="flex">
                          <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                            <span className="text-sm text-muted-foreground">+237</span>
                          </div>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="6XXXXXXXX"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required={loginWith === "email" ? false : true}
                            maxLength={9}
                          />
                        </div>
                      </div>
                  </TabsContent>
                </form>
            </Tabs>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
        </CardContent>
      </Card>
    </div>
  )
}
