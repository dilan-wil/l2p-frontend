import { MemberLayout } from "@/components/layout/member-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Plus, Calendar, TrendingUp, DollarSign, FileText } from "lucide-react"
import Link from "next/link"

const mockLoanData = {
  activeLoan: {
    id: "LN001",
    amount: 200000,
    balance: 125000,
    interestRate: 2.5,
    term: 12,
    remainingPayments: 8,
    monthlyPayment: 12500,
    nextPaymentDate: "2024-01-18",
    status: "active",
    purpose: "Business Expansion",
    disbursedDate: "2023-09-15",
  },
  loanHistory: [
    {
      id: "LN001",
      amount: 200000,
      purpose: "Business Expansion",
      status: "active",
      disbursedDate: "2023-09-15",
    },
    {
      id: "LN002",
      amount: 150000,
      purpose: "Equipment Purchase",
      status: "completed",
      disbursedDate: "2023-03-10",
    },
  ],
  eligibility: {
    maxAmount: 500000,
    creditScore: 720,
    eligible: true,
  },
}

export default function LoansPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const loanProgress =
    ((mockLoanData.activeLoan.term - mockLoanData.activeLoan.remainingPayments) / mockLoanData.activeLoan.term) * 100

  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Loans</h1>
            <p className="text-muted-foreground">Manage your loans and apply for new financing</p>
          </div>
          <div className="flex space-x-3">
            <Button asChild>
              <Link href="/dashboard/loans/apply">
                <Plus className="h-4 w-4 mr-2" />
                Apply for Loan
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/loans/repay">
                <DollarSign className="h-4 w-4 mr-2" />
                Make Payment
              </Link>
            </Button>
          </div>
        </div>

        {/* Active Loan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(mockLoanData.activeLoan.balance)}</div>
              <p className="text-xs text-muted-foreground">
                of {formatCurrency(mockLoanData.activeLoan.amount)} original
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Payment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(mockLoanData.activeLoan.monthlyPayment)}</div>
              <p className="text-xs text-muted-foreground">Due: {mockLoanData.activeLoan.nextPaymentDate}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interest Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockLoanData.activeLoan.interestRate}%</div>
              <p className="text-xs text-muted-foreground">Monthly rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining Payments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockLoanData.activeLoan.remainingPayments}</div>
              <p className="text-xs text-muted-foreground">of {mockLoanData.activeLoan.term} months</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Loan Details */}
          <Card>
            <CardHeader>
              <CardTitle>Active Loan Details</CardTitle>
              <CardDescription>Your current loan information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Loan ID:</span>
                <span className="font-medium">{mockLoanData.activeLoan.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Purpose:</span>
                <span className="font-medium">{mockLoanData.activeLoan.purpose}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Disbursed:</span>
                <span className="font-medium">{mockLoanData.activeLoan.disbursedDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant="default">Active</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Repayment Progress</span>
                  <span>{Math.round(loanProgress)}%</span>
                </div>
                <Progress value={loanProgress} className="h-2" />
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1" asChild>
                  <Link href="/dashboard/loans/schedule">View Schedule</Link>
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/dashboard/loans/repay">Make Payment</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loan Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Eligibility</CardTitle>
              <CardDescription>Your borrowing capacity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(mockLoanData.eligibility.maxAmount)}
                </div>
                <p className="text-sm text-muted-foreground">Maximum loan amount</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Credit Score:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{mockLoanData.eligibility.creditScore}</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Excellent
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Eligibility Status:</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Eligible
                  </Badge>
                </div>
              </div>

              <Button className="w-full" asChild>
                <Link href="/dashboard/loans/apply">Apply for New Loan</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Loan History */}
        <Card>
          <CardHeader>
            <CardTitle>Loan History</CardTitle>
            <CardDescription>Your previous and current loans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLoanData.loanHistory.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{loan.purpose}</p>
                      <p className="text-sm text-muted-foreground">
                        {loan.id} • {formatCurrency(loan.amount)} • {loan.disbursedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={loan.status === "active" ? "default" : "secondary"}>{loan.status}</Badge>
                    {loan.status === "active" && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/loans/${loan.id}`}>View Details</Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  )
}
