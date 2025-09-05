"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  CreditCard,
  DollarSign,
  PiggyBank,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Send,
  Download,
  Settings,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useAuth } from "@/hooks/auth-context";
import { getInitials } from "@/functions/getInitials";
import { formatCurrency } from "@/functions/formatCurrency";
import { useRouter } from "next/navigation";
import { maskCardNumber } from "@/functions/maskCardNumber";
import DepositDialog from "@/components/dialogs/deposit-dialog";
import TransferDialog from "@/components/dialogs/transfer-dialog";

// Mock data
const mockUser = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  avatar: "/professional-woman-avatar.png",
  notifications: 3,
};

const mockAccounts = [
  {
    id: 1,
    name: "Primary Checking",
    type: "Checking",
    balance: 12450.75,
    accountNumber: "****1234",
  },
  {
    id: 2,
    name: "High Yield Savings",
    type: "Savings",
    balance: 45230.2,
    accountNumber: "****5678",
  },
  {
    id: 3,
    name: "Investment Portfolio",
    type: "Investment",
    balance: 89750.5,
    accountNumber: "****9012",
  },
];

const mockTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Direct Deposit - Salary",
    amount: 5200.0,
    type: "credit",
    status: "completed",
  },
  {
    id: 2,
    date: "2024-01-14",
    description: "Grocery Store Purchase",
    amount: -127.45,
    type: "debit",
    status: "completed",
  },
  {
    id: 3,
    date: "2024-01-13",
    description: "Online Transfer to Savings",
    amount: -1000.0,
    type: "transfer",
    status: "completed",
  },
  {
    id: 4,
    date: "2024-01-12",
    description: "ATM Withdrawal",
    amount: -200.0,
    type: "debit",
    status: "completed",
  },
  {
    id: 5,
    date: "2024-01-11",
    description: "Investment Dividend",
    amount: 450.75,
    type: "credit",
    status: "pending",
  },
];

const mockChartData = [
  { month: "Jul", income: 5200, expenses: 3800 },
  { month: "Aug", income: 5200, expenses: 4100 },
  { month: "Sep", income: 5200, expenses: 3600 },
  { month: "Oct", income: 5200, expenses: 4200 },
  { month: "Nov", income: 5200, expenses: 3900 },
  { month: "Dec", income: 5200, expenses: 4500 },
  { month: "Jan", income: 5200, expenses: 3700 },
];

const mockBalanceData = [
  { month: "Jul", balance: 142000 },
  { month: "Aug", balance: 143100 },
  { month: "Sep", balance: 144600 },
  { month: "Oct", balance: 145400 },
  { month: "Nov", balance: 146900 },
  { month: "Dec", balance: 147400 },
  { month: "Jan", balance: 147431 },
];

export default function BankingDashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const { user, userAccounts, accessToken } = useAuth();
  const router = useRouter();

  const totalBalance = userAccounts
    .filter((acc) => acc.rib)
    .reduce((sum, account) => sum + Number(account.balance), 0);
  const availableFunds = userAccounts
    .filter(
      (acc) => acc.rib && (acc.type === "CHEQUE" || acc.type === "COURANT")
    )
    .reduce((sum, account) => sum + Number(account.balance), 0);
  const recentTransactionsCount = mockTransactions.filter(
    (t) => t.status === "completed"
  ).length;
  const pendingTransfers = mockTransactions.filter(
    (t) => t.status === "pending"
  ).length;

  const handleDeposit = () => {
    if (!depositAmount || !selectedAccount) {
      // toast({
      //   title: "Error",
      //   description: "Please fill in all required fields.",
      //   variant: "destructive",
      // })
      return;
    }
    // toast({
    //   title: "Deposit Successful",
    //   description: `$${depositAmount} has been deposited to your account.`,
    // })
    setDepositAmount("");
    setSelectedAccount("");
  };

  const handleTransfer = () => {
    if (!transferAmount || !selectedAccount) {
      // toast({
      //   title: "Error",
      //   description: "Please fill in all required fields.",
      //   variant: "destructive",
      // })
      return;
    }
    // toast({
    //   title: "Transfer Initiated",
    //   description: `$${transferAmount} transfer has been initiated.`,
    // })
    setTransferAmount("");
    setSelectedAccount("");
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || !selectedAccount) {
      // toast({
      //   title: "Error",
      //   description: "Please fill in all required fields.",
      //   variant: "destructive",
      // })
      return;
    }
    // toast({
    //   title: "Withdrawal Processed",
    //   description: `$${withdrawAmount} has been withdrawn from your account.`,
    // })
    setWithdrawAmount("");
    setSelectedAccount("");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 space-y-8">
        <div className="w-full bg-blue-500 text-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {user?.profile.firstName}!
            </h1>
            <p className="text-sm md:text-base text-blue-100">
              Here’s your financial overview for today.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex text-black items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={mockUser.avatar}
                alt={user?.profile.firstName}
              />
              <AvatarFallback>
                {getInitials(user?.profile.firstName ?? "")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 cursor-pointer"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {showBalance ? `${formatCurrency(totalBalance)}` : "••••••"}
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +2.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hidden md:block hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Funds
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {showBalance ? `${formatCurrency(availableFunds)}` : "••••••"}
              </div>
              <p className="text-xs text-muted-foreground">Primary Checking</p>
            </CardContent>
          </Card>

          <Card className="hidden md:block hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Transactions
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{0}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="hidden md:block hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Transfers
              </CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{0}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting processing
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            {/* Accounts Overview */}
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.description}
                        </TableCell>
                        <TableCell
                          className={`font-semibold ${
                            transaction.amount > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              transaction.status === "completed"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>My Accounts</span>
                  <Button
                    onClick={() => router.push("/dashboard/accounts")}
                    variant="outline"
                    size="sm"
                  >
                    View Accounts
                  </Button>
                </CardTitle>
                <CardDescription>Manage your banking accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userAccounts
                  .filter((acc) => acc.rib)
                  .map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          {(account.type === "COURANT" ||
                            account.type === "CHEQUE") && (
                            <CreditCard className="h-5 w-5 text-primary" />
                          )}
                          {(account.type === "EPARGNE" ||
                            account.type === "NDJANGUI") && (
                            <PiggyBank className="h-5 w-5 text-primary" />
                          )}
                          {account.type === "PLACEMENT" && (
                            <TrendingUp className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {account.type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {account.type} • {maskCardNumber(account.rib ?? "")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {showBalance
                            ? `${formatCurrency(Number(account.balance))}`
                            : "••••••"}
                        </p>
                        <Badge
                          variant={
                            account.type === "PLACEMENT"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {account.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your finances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Deposit Dialog */}
                <DepositDialog
                  accounts={userAccounts}
                  accessToken={accessToken}
                />

                {/* Transfer Dialog */}
                <TransferDialog accounts={userAccounts} />

                {/* Withdraw Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Withdraw Cash
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Withdraw Cash</DialogTitle>
                      <DialogDescription>
                        Withdraw money from your account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="withdraw-account">Select Account</Label>
                        <Select
                          value={selectedAccount}
                          onValueChange={setSelectedAccount}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose account" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockAccounts.map((account) => (
                              <SelectItem
                                key={account.id}
                                value={account.id.toString()}
                              >
                                {account.name} ({account.accountNumber})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="withdraw-amount">Amount</Label>
                        <Input
                          id="withdraw-amount"
                          type="number"
                          placeholder="0.00"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleWithdraw}>Withdraw</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Profile Widget */}
            <Card className="hidden md:block ">
              <CardHeader>
                <CardTitle>Profile & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={mockUser.avatar || "/placeholder.svg"}
                      alt={user?.profile.firstName}
                    />
                    <AvatarFallback>
                      {getInitials(user?.profile.firstName ?? "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {user?.profile.firstName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                    <Progress value={85} className="mt-2" />
                    {/* <p className="text-xs text-muted-foreground mt-1">
                      Profile 85% complete
                    </p> */}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => router.push("/dashboard/profile")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => router.push("/dashboard/settings")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Charts */}
            <Card className="hidden md:block">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="spending" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="spending">
                      Income vs Expenses
                    </TabsTrigger>
                    <TabsTrigger value="balance">Balance Trend</TabsTrigger>
                  </TabsList>
                  <TabsContent value="spending" className="space-y-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="income" fill="hsl(var(--chart-1))" />
                        <Bar dataKey="expenses" fill="hsl(var(--chart-2))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="balance" className="space-y-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={mockBalanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="balance"
                          stroke="hsl(var(--chart-3))"
                          fill="hsl(var(--chart-3))"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
