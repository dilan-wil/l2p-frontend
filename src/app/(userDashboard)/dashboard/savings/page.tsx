import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PiggyBank, Plus, ArrowDownRight, TrendingUp, Calendar, Target } from "lucide-react"
import Link from "next/link"

const mockSavingsData = {
  currentBalance: 450000,
  monthlyTarget: 50000,
  monthlyProgress: 35000,
  interestRate: 3.5,
  accountType: "Premium Savings",
  openedDate: "2023-03-15",
  recentDeposits: [
    { date: "2024-01-15", amount: 25000, method: "MTN Money", status: "completed" },
    { date: "2024-01-12", amount: 180000, method: "Bank Transfer", status: "completed" },
    { date: "2024-01-08", amount: 15000, method: "Orange Money", status: "completed" },
    { date: "2024-01-05", amount: 30000, method: "Cash Deposit", status: "completed" },
  ],
  savingsGoals: [
    { name: "Emergency Fund", target: 500000, current: 450000, deadline: "2024-06-30" },
    { name: "Business Expansion", target: 1000000, current: 200000, deadline: "2024-12-31" },
  ],
}

export default function SavingsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const monthlyProgressPercent = (mockSavingsData.monthlyProgress / mockSavingsData.monthlyTarget) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Savings Account</h1>
          <p className="text-gray-600">Manage your savings and track your financial goals</p>
        </div>
        <div className="flex space-x-3">
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/dashboard/savings/deposit">
              <Plus className="h-4 w-4 mr-2" />
              Make Deposit
            </Link>
          </Button>
          <Button variant="outline" asChild className="border-red-500 text-red-600 hover:bg-red-50">
            <Link href="/dashboard/savings/withdraw">
              <ArrowDownRight className="h-4 w-4 mr-2" />
              Withdraw
            </Link>
          </Button>
        </div>
      </div>

      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Current Balance</CardTitle>
            <PiggyBank className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{formatCurrency(mockSavingsData.currentBalance)}</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              {mockSavingsData.interestRate}% annual interest
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Monthly Progress</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{formatCurrency(mockSavingsData.monthlyProgress)}</div>
            <p className="text-xs text-blue-600">of {formatCurrency(mockSavingsData.monthlyTarget)} target</p>
            <Progress value={monthlyProgressPercent} className="h-2 [&>div]:bg-blue-600 mt-2 bg-blue-200" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Account Type</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">{mockSavingsData.accountType}</div>
            <p className="text-xs text-purple-600">Since {mockSavingsData.openedDate}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deposits */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Recent Deposits</CardTitle>
            <CardDescription className="text-gray-500">Your latest savings deposits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSavingsData.recentDeposits.map((deposit, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Plus className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">Deposit via {deposit.method}</p>
                      <p className="text-xs text-gray-500">{deposit.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+{formatCurrency(deposit.amount)}</p>
                    <Badge variant="default" className="bg-green-600 text-white text-xs">
                      {deposit.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Savings Goals */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Savings Goals</CardTitle>
            <CardDescription className="text-gray-500">Track your financial objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockSavingsData.savingsGoals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-800">{goal.name}</h4>
                      <span className="text-sm text-blue-600">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 [&>div]:bg-blue-600 bg-blue-200" />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                      </span>
                      <span>Due: {goal.deadline}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
