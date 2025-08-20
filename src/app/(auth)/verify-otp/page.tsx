"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "@/lib/useTranslations"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("")
  const params = useParams()
  const toValue = params.to
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const t = useTranslations('login')
  const g = useTranslations()
  
  useEffect(() => {
    const pendingPhone = localStorage.getItem("pendingPhone")
    if (!pendingPhone) {
      return
    }
    setPhoneNumber(pendingPhone)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // router.push("/waiting-verification")

  }

  const handleResendOTP = async () => {
    try {
      
      alert("OTP resent successfully!")
    } catch (error) {
      console.error("Resend OTP error:", error)
      alert("Failed to resend OTP. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{t('verifyOTP')}</CardTitle>
          <CardDescription>{t('enterOTP')} {toValue}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">{t('codeOTP')}</Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={handleResendOTP}>
              {t('resend OTP')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
