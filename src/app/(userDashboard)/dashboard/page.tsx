import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  PiggyBank,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Mock data
const mockData = {
  user: {
    name: "Marie Dubois",
    savingsBalance: 450000,
    loanBalance: 125000,
    totalDeposits: 850000,
    creditScore: 720,
  },
  recentTransactions: [
    {
      id: "1",
      type: "deposit",
      description: "Mobile Money Deposit",
      amount: 25000,
      date: "2024-01-15",
      status: "completed",
      method: "MTN Money",
    },
    {
      id: "2",
      type: "withdrawal",
      description: "Cash Withdrawal",
      amount: -15000,
      date: "2024-01-14",
      status: "completed",
      method: "Branch",
    },
    {
      id: "3",
      type: "loan_payment",
      description: "Loan Repayment",
      amount: -12500,
      date: "2024-01-13",
      status: "completed",
      method: "Auto Debit",
    },
    {
      id: "4",
      type: "deposit",
      description: "Salary Deposit",
      amount: 180000,
      date: "2024-01-12",
      status: "pending",
      method: "Bank Transfer",
    },
  ],
  notifications: [
    {
      id: "1",
      title: "Loan Payment Due",
      message: "Your loan payment of 12,500 XAF is due in 3 days",
      type: "warning",
      date: "2024-01-15",
      read: false,
    },
    {
      id: "2",
      title: "Deposit Successful",
      message: "Your deposit of 25,000 XAF has been processed",
      type: "success",
      date: "2024-01-15",
      read: false,
    },
    {
      id: "3",
      title: "Monthly Statement Ready",
      message: "Your December statement is now available",
      type: "info",
      date: "2024-01-14",
      read: true,
    },
  ],
  loanInfo: {
    nextPayment: 12500,
    nextPaymentDate: "2024-01-18",
    remainingPayments: 8,
    interestRate: 2.5,
  },
}

export default function DashboardPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const loanProgress = ((12 - mockData.loanInfo.remainingPayments) / 12) * 100

  return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Marie!</h1>
          <p className="text-muted-foreground">Here's your financial overview for today.</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Balance</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(mockData.user.savingsBalance)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +2.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loan</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(mockData.user.loanBalance)}</div>
              <p className="text-xs text-muted-foreground">{mockData.loanInfo.remainingPayments} payments remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(mockData.user.totalDeposits)}</div>
              <p className="text-xs text-muted-foreground">Lifetime deposits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.user.creditScore}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">Excellent</span> rating
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest account activity</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/transactions">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "deposit"
                            ? "bg-green-100 text-green-600"
                            : transaction.type === "withdrawal"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {transaction.type === "deposit" ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.method} • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </p>
                      <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/dashboard/savings/deposit">
                    <Plus className="h-4 w-4 mr-2" />
                    Make Deposit
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/dashboard/savings/withdraw">
                    <ArrowDownRight className="h-4 w-4 mr-2" />
                    Request Withdrawal
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/dashboard/loans/apply">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Apply for Loan
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Loan Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Progress</CardTitle>
                <CardDescription>Current loan repayment status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round(loanProgress)}%</span>
                  </div>
                  <Progress value={loanProgress} className="h-2" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Payment:</span>
                    <span className="font-medium">{formatCurrency(mockData.loanInfo.nextPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium">{mockData.loanInfo.nextPaymentDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining:</span>
                    <span className="font-medium">{mockData.loanInfo.remainingPayments} payments</span>
                  </div>
                </div>
                <Button size="sm" className="w-full" asChild>
                  <Link href="/dashboard/loans/repay">Make Payment</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.type === "warning"
                            ? "bg-yellow-100 text-yellow-600"
                            : notification.type === "success"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {notification.type === "warning" ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : notification.type === "success" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
