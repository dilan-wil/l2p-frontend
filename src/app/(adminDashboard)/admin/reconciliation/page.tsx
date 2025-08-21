"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Download, CheckCircle, Clock, DollarSign, TrendingUp, TrendingDown, Flag } from "lucide-react"

// Mock reconciliation data
const mockTransactions = [
  {
    id: "TXN001",
    userId: "USR001",
    userName: "John Doe",
    date: "2024-01-15",
    amount: 2500.0,
    type: "deposit",
    status: "pending",
    description: "Salary Deposit",
    account: "Checking Account",
    reference: "REF001234",
    verificationStatus: "unverified",
  },
  {
    id: "TXN002",
    userId: "USR002",
    userName: "Jane Smith",
    date: "2024-01-14",
    amount: -150.0,
    type: "withdrawal",
    status: "completed",
    description: "ATM Withdrawal",
    account: "Checking Account",
    reference: "REF001235",
    verificationStatus: "verified",
  },
  {
    id: "TXN003",
    userId: "USR003",
    userName: "Mike Johnson",
    date: "2024-01-13",
    amount: -89.99,
    type: "withdrawal",
    status: "failed",
    description: "Online Purchase",
    account: "Credit Card",
    reference: "REF001236",
    verificationStatus: "flagged",
  },
  {
    id: "TXN004",
    userId: "USR001",
    userName: "John Doe",
    date: "2024-01-12",
    amount: 1000.0,
    type: "deposit",
    status: "completed",
    description: "Investment Return",
    account: "Investment Account",
    reference: "REF001237",
    verificationStatus: "verified",
  },
  {
    id: "TXN005",
    userId: "USR004",
    userName: "Sarah Wilson",
    date: "2024-01-11",
    amount: -45.5,
    type: "withdrawal",
    status: "pending",
    description: "Subscription Payment",
    account: "Checking Account",
    reference: "REF001238",
    verificationStatus: "unverified",
  },
]

export default function ReconciliationPage() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    const matchesVerification = verificationFilter === "all" || transaction.verificationStatus === verificationFilter

    return matchesSearch && matchesStatus && matchesType && matchesVerification
  })

  const totalTransactions = transactions.length
  const pendingTransactions = transactions.filter((t) => t.verificationStatus === "unverified").length
  const flaggedTransactions = transactions.filter((t) => t.verificationStatus === "flagged").length
  const totalAmount = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "unverified":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "flagged":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatCurrency = (amount: number) => {
    const isNegative = amount < 0
    const formattedAmount = Math.abs(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
    return isNegative ? `-${formattedAmount}` : formattedAmount
  }

  const handleVerificationAction = (action: string, transactionId: string) => {
    setTransactions((prev) =>
      prev.map((transaction) => {
        if (transaction.id === transactionId) {
          return { ...transaction, verificationStatus: action }
        }
        return transaction
      }),
    )

    // toast({
    //   title: "Transaction Updated",
    //   description: `Transaction marked as ${action}.`,
    // })
  }

  const handleBulkVerification = (action: string) => {
    if (selectedTransactions.length === 0) {
    //   toast({
    //     title: "No Transactions Selected",
    //     description: "Please select transactions to perform bulk actions.",
    //     variant: "destructive",
    //   })
      return
    }

    setTransactions((prev) =>
      prev.map((transaction) => {
        if (selectedTransactions.includes(transaction.id)) {
          return { ...transaction, verificationStatus: action }
        }
        return transaction
      }),
    )

    // toast({
    //   title: "Bulk Action Completed",
    //   description: `${selectedTransactions.length} transactions marked as ${action}.`,
    // })

    setSelectedTransactions([])
  }

  const toggleTransactionSelection = (transactionId: string) => {
    setSelectedTransactions((prev) =>
      prev.includes(transactionId) ? prev.filter((id) => id !== transactionId) : [...prev, transactionId],
    )
  }

  const toggleAllTransactions = () => {
    setSelectedTransactions(
      selectedTransactions.length === filteredTransactions.length ? [] : filteredTransactions.map((t) => t.id),
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reconciliation</h1>
          <p className="text-muted-foreground">Review and verify financial transactions</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
            <p className="text-xs text-muted-foreground">{totalTransactions} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingTransactions}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((pendingTransactions / totalTransactions) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Flagged
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{flaggedTransactions}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalTransactions - pendingTransactions - flaggedTransactions}
            </div>
            <p className="text-xs text-muted-foreground">Completed reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Transactions
          </CardTitle>
          <CardDescription>Search and filter transactions for reconciliation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
              </SelectContent>
            </Select>
            <Select value={verificationFilter} onValueChange={setVerificationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Verification</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedTransactions.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedTransactions.length} transaction{selectedTransactions.length > 1 ? "s" : ""} selected
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleBulkVerification("verified")}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Verified
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkVerification("flagged")}>
                  <Flag className="h-4 w-4 mr-2" />
                  Flag for Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} of {totalTransactions} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedTransactions.length === filteredTransactions.length}
                      onCheckedChange={toggleAllTransactions}
                    />
                  </TableHead>
                  <TableHead>Transaction</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTransactions.includes(transaction.id)}
                        onCheckedChange={() => toggleTransactionSelection(transaction.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.id}</p>
                        <p className="text-xs text-muted-foreground">{transaction.reference}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.userName}</p>
                        <p className="text-sm text-muted-foreground">{transaction.userId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === "deposit" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <Badge variant={transaction.type === "deposit" ? "default" : "secondary"}>
                          {transaction.type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getVerificationColor(transaction.verificationStatus)}>
                        {transaction.verificationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {transaction.verificationStatus !== "verified" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerificationAction("verified", transaction.id)}
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                        {transaction.verificationStatus !== "flagged" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerificationAction("flagged", transaction.id)}
                          >
                            <Flag className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
