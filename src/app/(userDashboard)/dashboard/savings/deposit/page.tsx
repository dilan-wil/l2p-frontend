"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Smartphone, CheckCircle, Receipt } from "lucide-react"
import Link from "next/link"

export default function DepositPage() {
  const [step, setStep] = useState<"form" | "processing" | "success">("form")
  const [formData, setFormData] = useState({
    amount: "",
    wallet: "mtn",
    phone: "+237 677 123 456",
  })
  const [transactionId] = useState("TXN" + Math.random().toString(36).substr(2, 9).toUpperCase())

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("processing")

    // Mock processing delay
    setTimeout(() => {
      setStep("success")
    }, 3000)
  }

  if (step === "processing") {
    return (
        <div className="max-w-md mx-auto mt-8">
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
                <p className="text-muted-foreground">
                  Please complete the payment on your {formData.wallet === "mtn" ? "MTN Money" : "Orange Money"} device
                </p>
              </div>
              <Alert>
                <Smartphone className="h-4 w-4" />
                <AlertDescription>
                  Check your phone for the payment prompt and enter your PIN to complete the transaction.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
    )
  }

  if (step === "success") {
    return (
        <div className="max-w-md mx-auto mt-8">
          <Card>
            <CardContent className="pt-6 text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Deposit Successful!</h2>
                <p className="text-muted-foreground">Your deposit has been processed successfully</p>
              </div>

              {/* Receipt */}
              <div className="bg-muted/50 p-4 rounded-lg text-left space-y-2">
                <div className="flex items-center space-x-2 mb-3">
                  <Receipt className="h-4 w-4" />
                  <span className="font-medium">Transaction Receipt</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">{formatCurrency(Number.parseInt(formData.amount))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Method:</span>
                    <span className="font-medium">{formData.wallet === "mtn" ? "MTN Money" : "Orange Money"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-medium">{transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium text-green-600">Completed</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/dashboard/savings">View Savings Account</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
    )
  }

  return (
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard/savings">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Savings
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Make a Deposit</h1>
          <p className="text-muted-foreground">Add money to your savings account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Deposit Funds</CardTitle>
            <CardDescription>Choose your payment method and enter the amount</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="amount">Amount (XAF)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  min="1000"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">Minimum deposit: 1,000 XAF</p>
              </div>

              <div>
                <Label>Payment Method</Label>
                <RadioGroup
                  value={formData.wallet}
                  onValueChange={(value) => setFormData({ ...formData, wallet: value })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="mtn" id="mtn" />
                    <Label htmlFor="mtn" className="flex-1 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                          <span className="text-yellow-600 font-bold text-xs">MTN</span>
                        </div>
                        <div>
                          <p className="font-medium">MTN Money</p>
                          <p className="text-xs text-muted-foreground">Mobile money transfer</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="orange" id="orange" />
                    <Label htmlFor="orange" className="flex-1 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                          <span className="text-orange-600 font-bold text-xs">OM</span>
                        </div>
                        <div>
                          <p className="font-medium">Orange Money</p>
                          <p className="text-xs text-muted-foreground">Mobile money transfer</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              {formData.amount && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    You will deposit <strong>{formatCurrency(Number.parseInt(formData.amount))}</strong> via{" "}
                    {formData.wallet === "mtn" ? "MTN Money" : "Orange Money"}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={!formData.amount || Number.parseInt(formData.amount) < 1000}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Pay with {formData.wallet === "mtn" ? "MTN Money" : "Orange Money"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}
