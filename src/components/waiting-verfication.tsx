import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

export default function WaitingVerificationPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verification in Progress</CardTitle>
          <CardDescription>Your account is currently being reviewed by our team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              We are verifying your information and documents. This process typically takes 1-2 business days.
            </p>
            <p className="text-sm text-muted-foreground">
              You will receive a notification once your account has been approved.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}