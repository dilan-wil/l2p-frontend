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
import { useAuth } from "@/hooks/auth-context"
import { useRouter } from "next/navigation"

const accountTypeLabels: Record<string, string> = {
  COURANT: "Checking",
  EPARGNE: "Savings",
  NDJANGUI: "Ndjangui",
  CHEQUE: "Cheque",
  PLACEMENT: "Placement",
}

const accountTypeConfig: Record<
  string,
  { icon: any; color: string; label: string }
> = {
  EPARGNE: {
    icon: PiggyBank,
    color: "bg-green-500",
    label: "Compte Épargne",
  },
  COURANT: {
    icon: Wallet,
    color: "bg-blue-500",
    label: "Compte Courant",
  },
  NDJANGUI: {
    icon: TrendingUp,
    color: "bg-purple-500",
    label: "Njangui",
  },
  CHEQUE: {
    icon: CreditCard,
    color: "bg-orange-500",
    label: "Compte Chèque",
  },
  PLACEMENT: {
    icon: TrendingUp,
    color: "bg-yellow-500",
    label: "Placement",
  },
}

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<(typeof userAccounts)[0] | null>(null)
  const { user, userAccounts } = useAuth()
  const router = useRouter()
  const totalBalance = userAccounts
    // .filter((account) => account.type !== "credit")
    .reduce((sum, account) => sum + Number(account.balance), 0)

  const totalDebt = userAccounts
    // .filter((account) => account.type === "credit")
    .reduce((sum, account) => sum + Math.abs(Number(account.balance)), 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "XAF",
    }).format(amount)
  }
  const uniqueTypes = Array.from(new Set(userAccounts.map(acc => acc.type)))
  const getAccountStatusColor = (active: boolean) => {
    return active
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
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
            <div className="text-2xl font-bold">{userAccounts.filter((acc) => acc.rib !== null).length}</div>
            <p className="text-xs text-muted-foreground">Out of {userAccounts.length} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
        {/* Always show "All Accounts" */}
        <TabsTrigger value="all">All Accounts</TabsTrigger>

        {/* Dynamically generate tabs based on account types */}
        {uniqueTypes.map((type) => (
          <TabsTrigger key={type} value={type}>
            {accountTypeLabels[type] || type}
          </TabsTrigger>
        ))}
      </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {userAccounts.map((account) => {
              const config =
                accountTypeConfig[account.type as keyof typeof accountTypeConfig] ??
                {
                  icon: Wallet,
                  color: "bg-gray-500",
                  label: account.type,
                }
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
                          <CardTitle className="text-lg">{config.label}</CardTitle>
                          <CardDescription>
                            {account.rib ? `Account Number: XAF{account.rib}` : "No Account Yet"}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getAccountStatusColor(account.active)}>
                        {account.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Available Balance</p>
                        <p
                          className={`text-2xl font-bold ${
                            Number(account.balance) < 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {Number(account.balance).toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "XAF",
                          })}
                        </p>
                      </div>

                      {/* Conditional Action Button */}
                      {account.rib ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/account/${account.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      ) : (
                        <Button
                          className="bg-blue-600"
                          size="sm"
                          onClick={() => router.push("/open-account")}
                        >
                          Open Account
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Since {new Date(account.createdAt).getFullYear()}
                          </span>
                        </div>
                      </div>
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
              {userAccounts
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
                              <CardTitle className="text-lg">{config.label}</CardTitle>
                              <CardDescription>
                                {account.rib ? `Account Number: XAF{account.rib}` : "No Account Yet"}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className={getAccountStatusColor(account.active)}>
                            {account.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Available Balance</p>
                            <p
                              className={`text-2xl font-bold ${
                                Number(account.balance) < 0 ? "text-red-600" : "text-green-600"
                              }`}
                            >
                              {Number(account.balance).toLocaleString("fr-FR", {
                                style: "currency",
                                currency: "XAF",
                              })}
                            </p>
                          </div>

                          {/* Conditional Action Button */}
                          {account.rib ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/account/${account.id}`)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          ) : (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => router.push("/open-account")}
                            >
                              Open Account
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                Since {new Date(account.createdAt).getFullYear()}
                              </span>
                            </div>
                          </div>
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
