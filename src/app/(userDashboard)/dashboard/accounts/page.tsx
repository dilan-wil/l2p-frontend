"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Wallet,
  CreditCard,
  TrendingUp,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  PiggyBank,
  Building,
  Calendar,
  Activity,
} from "lucide-react"

// Mock account data
const mockAccounts = [
  {
    id: "ACC001",
    name: "Primary Checking",
    type: "checking",
    accountNumber: "****1234",
    balance: 15420.75,
    availableBalance: 15420.75,
    status: "active",
    openDate: "2022-01-15",
    interestRate: 0.01,
    monthlyFee: 0,
    recentActivity: [
      { date: "2024-01-15", description: "Direct Deposit - Salary", amount: 3500.0, type: "credit" },
      { date: "2024-01-14", description: "ATM Withdrawal", amount: -100.0, type: "debit" },
      { date: "2024-01-13", description: "Online Transfer to Savings", amount: -500.0, type: "debit" },
      { date: "2024-01-12", description: "Grocery Store Purchase", amount: -89.45, type: "debit" },
      { date: "2024-01-11", description: "Gas Station", amount: -45.2, type: "debit" },
    ],
  },
  {
    id: "ACC002",
    name: "High Yield Savings",
    type: "savings",
    accountNumber: "****5678",
    balance: 25750.0,
    availableBalance: 25750.0,
    status: "active",
    openDate: "2022-01-15",
    interestRate: 4.5,
    monthlyFee: 0,
    recentActivity: [
      { date: "2024-01-13", description: "Transfer from Checking", amount: 500.0, type: "credit" },
      { date: "2024-01-01", description: "Interest Payment", amount: 95.31, type: "credit" },
      { date: "2023-12-15", description: "Monthly Deposit", amount: 1000.0, type: "credit" },
    ],
  },
  {
    id: "ACC003",
    name: "Investment Portfolio",
    type: "investment",
    accountNumber: "****9012",
    balance: 48920.33,
    availableBalance: 48920.33,
    status: "active",
    openDate: "2022-03-01",
    interestRate: 7.2,
    monthlyFee: 25,
    recentActivity: [
      { date: "2024-01-15", description: "Dividend Payment - AAPL", amount: 125.5, type: "credit" },
      { date: "2024-01-10", description: "Stock Purchase - MSFT", amount: -2500.0, type: "debit" },
      { date: "2024-01-05", description: "Portfolio Rebalancing", amount: 0, type: "neutral" },
    ],
  },
  {
    id: "ACC004",
    name: "Rewards Credit Card",
    type: "credit",
    accountNumber: "****3456",
    balance: -1250.45,
    availableBalance: 8749.55,
    creditLimit: 10000,
    status: "active",
    openDate: "2022-06-01",
    interestRate: 18.99,
    monthlyFee: 0,
    recentActivity: [
      { date: "2024-01-14", description: "Online Shopping", amount: -299.99, type: "debit" },
      { date: "2024-01-13", description: "Restaurant", amount: -85.5, type: "debit" },
      { date: "2024-01-12", description: "Payment Received", amount: 500.0, type: "credit" },
      { date: "2024-01-10", description: "Gas Station", amount: -45.2, type: "debit" },
    ],
  },
]

const accountTypeConfig = {
  checking: {
    icon: Wallet,
    color: "bg-blue-500",
    label: "Checking Account",
  },
  savings: {
    icon: PiggyBank,
    color: "bg-green-500",
    label: "Savings Account",
  },
  investment: {
    icon: TrendingUp,
    color: "bg-purple-500",
    label: "Investment Account",
  },
  credit: {
    icon: CreditCard,
    color: "bg-orange-500",
    label: "Credit Card",
  },
}

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<(typeof mockAccounts)[0] | null>(null)

  const totalBalance = mockAccounts
    .filter((account) => account.type !== "credit")
    .reduce((sum, account) => sum + account.balance, 0)

  const totalDebt = mockAccounts
    .filter((account) => account.type === "credit")
    .reduce((sum, account) => sum + Math.abs(account.balance), 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getAccountStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "frozen":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">Manage and view all your financial accounts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalBalance)}</div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Total Debt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalDebt)}</div>
            <p className="text-xs text-muted-foreground">Credit card balances</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4" />
              Net Worth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance - totalDebt)}</div>
            <p className="text-xs text-muted-foreground">Assets minus liabilities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Active Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAccounts.filter((acc) => acc.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Out of {mockAccounts.length} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Accounts</TabsTrigger>
          <TabsTrigger value="checking">Checking</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
          <TabsTrigger value="credit">Credit Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockAccounts.map((account) => {
              const config = accountTypeConfig[account.type as keyof typeof accountTypeConfig]
              const IconComponent = config.icon

              return (
                <Card key={account.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${config.color} text-white`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{account.name}</CardTitle>
                          <CardDescription>
                            {config.label} • {account.accountNumber}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getAccountStatusColor(account.status)}>{account.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {account.type === "credit" ? "Current Balance" : "Available Balance"}
                        </p>
                        <p className={`text-2xl font-bold ${account.balance < 0 ? "text-red-600" : "text-green-600"}`}>
                          {formatCurrency(account.type === "credit" ? account.availableBalance : account.balance)}
                        </p>
                      </div>
                      {account.type === "credit" && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Credit Used</p>
                          <div className="w-24">
                            <Progress
                              value={((account.creditLimit! + account.balance) / account.creditLimit!) * 100}
                              className="h-2"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {Math.round(((account.creditLimit! + account.balance) / account.creditLimit!) * 100)}%
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {account.type === "credit" && (
                      <div className="text-sm text-muted-foreground">
                        <p>Outstanding Balance: {formatCurrency(Math.abs(account.balance))}</p>
                        <p>Credit Limit: {formatCurrency(account.creditLimit!)}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {account.interestRate}% {account.type === "credit" ? "APR" : "APY"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Since {new Date(account.openDate).getFullYear()}
                          </span>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedAccount(account)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <IconComponent className="h-5 w-5" />
                              {account.name}
                            </DialogTitle>
                            <DialogDescription>
                              {config.label} • Account {account.accountNumber}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Account Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">Current Balance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p
                                    className={`text-xl font-bold ${account.balance < 0 ? "text-red-600" : "text-green-600"}`}
                                  >
                                    {formatCurrency(account.balance)}
                                  </p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">Available Balance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-xl font-bold">{formatCurrency(account.availableBalance)}</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">Interest Rate</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-xl font-bold">
                                    {account.interestRate}% {account.type === "credit" ? "APR" : "APY"}
                                  </p>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Recent Activity */}
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                              <div className="rounded-md border">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Date</TableHead>
                                      <TableHead>Description</TableHead>
                                      <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {account.recentActivity.map((activity, index) => (
                                      <TableRow key={index}>
                                        <TableCell className="font-medium">
                                          {new Date(activity.date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="flex items-center gap-2">
                                          {activity.type === "credit" ? (
                                            <ArrowDownRight className="h-4 w-4 text-green-600" />
                                          ) : activity.type === "debit" ? (
                                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                                          ) : (
                                            <Activity className="h-4 w-4 text-gray-600" />
                                          )}
                                          {activity.description}
                                        </TableCell>
                                        <TableCell
                                          className={`text-right font-medium ${
                                            activity.amount > 0
                                              ? "text-green-600"
                                              : activity.amount < 0
                                                ? "text-red-600"
                                                : "text-gray-600"
                                          }`}
                                        >
                                          {activity.amount !== 0 ? formatCurrency(activity.amount) : "—"}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>

                            {/* Account Details */}
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Account Details</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Account Number</p>
                                  <p className="font-medium">{account.accountNumber}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Account Type</p>
                                  <p className="font-medium">{config.label}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Opened</p>
                                  <p className="font-medium">{new Date(account.openDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Monthly Fee</p>
                                  <p className="font-medium">{formatCurrency(account.monthlyFee)}</p>
                                </div>
                                {account.type === "credit" && (
                                  <>
                                    <div>
                                      <p className="text-muted-foreground">Credit Limit</p>
                                      <p className="font-medium">{formatCurrency(account.creditLimit!)}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Available Credit</p>
                                      <p className="font-medium">{formatCurrency(account.availableBalance)}</p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Individual account type tabs */}
        {Object.keys(accountTypeConfig).map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockAccounts
                .filter((account) => account.type === type)
                .map((account) => {
                  const config = accountTypeConfig[account.type as keyof typeof accountTypeConfig]
                  const IconComponent = config.icon

                  return (
                    <Card key={account.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${config.color} text-white`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{account.name}</CardTitle>
                              <CardDescription>
                                {config.label} • {account.accountNumber}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className={getAccountStatusColor(account.status)}>{account.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {account.type === "credit" ? "Available Credit" : "Available Balance"}
                            </p>
                            <p
                              className={`text-2xl font-bold ${account.balance < 0 ? "text-red-600" : "text-green-600"}`}
                            >
                              {formatCurrency(account.type === "credit" ? account.availableBalance : account.balance)}
                            </p>
                          </div>
                          {account.type === "credit" && (
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Credit Used</p>
                              <div className="w-24">
                                <Progress
                                  value={((account.creditLimit! + account.balance) / account.creditLimit!) * 100}
                                  className="h-2"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  {Math.round(((account.creditLimit! + account.balance) / account.creditLimit!) * 100)}%
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {account.interestRate}% {account.type === "credit" ? "APR" : "APY"}
                              </span>
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedAccount(account)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <IconComponent className="h-5 w-5" />
                                  {account.name}
                                </DialogTitle>
                                <DialogDescription>
                                  {config.label} • Account {account.accountNumber}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                {/* Account Summary */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm">Current Balance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p
                                        className={`text-xl font-bold ${account.balance < 0 ? "text-red-600" : "text-green-600"}`}
                                      >
                                        {formatCurrency(account.balance)}
                                      </p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm">Available Balance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p className="text-xl font-bold">{formatCurrency(account.availableBalance)}</p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm">Interest Rate</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p className="text-xl font-bold">
                                        {account.interestRate}% {account.type === "credit" ? "APR" : "APY"}
                                      </p>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Recent Activity */}
                                <div>
                                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                                  <div className="rounded-md border">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Date</TableHead>
                                          <TableHead>Description</TableHead>
                                          <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {account.recentActivity.map((activity, index) => (
                                          <TableRow key={index}>
                                            <TableCell className="font-medium">
                                              {new Date(activity.date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="flex items-center gap-2">
                                              {activity.type === "credit" ? (
                                                <ArrowDownRight className="h-4 w-4 text-green-600" />
                                              ) : activity.type === "debit" ? (
                                                <ArrowUpRight className="h-4 w-4 text-red-600" />
                                              ) : (
                                                <Activity className="h-4 w-4 text-gray-600" />
                                              )}
                                              {activity.description}
                                            </TableCell>
                                            <TableCell
                                              className={`text-right font-medium ${
                                                activity.amount > 0
                                                  ? "text-green-600"
                                                  : activity.amount < 0
                                                    ? "text-red-600"
                                                    : "text-gray-600"
                                              }`}
                                            >
                                              {activity.amount !== 0 ? formatCurrency(activity.amount) : "—"}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
