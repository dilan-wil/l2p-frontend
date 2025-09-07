"use client";

import { useEffect, useState } from "react";
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
import WithdrawalDialog from "@/components/dialogs/withdraw-dialog";
import axios from "axios";
import { Transaction, TransactionsResponse } from "@/types/types";

// Mock data
const mockUser = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  avatar: "/professional-woman-avatar.png",
  notifications: 3,
};

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
  const { user, userAccounts, accessToken } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const totalBalance = userAccounts
    .filter((acc) => acc.rib)
    .reduce((sum, account) => sum + Number(account.balance), 0);
  const availableFunds = userAccounts
    .filter(
      (acc) => acc.rib && (acc.type === "CHEQUE" || acc.type === "COURANT")
    )
    .reduce((sum, account) => sum + Number(account.balance), 0);

  const recentTransactionsCount = transactions.filter(
    (t) => t.status === "SUCCESS"
  ).length;
  const pendingTransfers = transactions.filter(
    (t) => t.status === "PENDING"
  ).length;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get<TransactionsResponse>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/transactions/my-transactions?page=1&size=5`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setTransactions(res.data.data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    fetchTransactions();
  }, [accessToken]);

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
                    {transactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.description}
                        </TableCell>
                        <TableCell
                          className={`font-semibold ${
                            Number(transaction.amount) > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {Number(transaction.amount) > 0 ? "+" : ""}
                          {formatCurrency(Number(transaction.amount))}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "SUCCESS"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              transaction.status === "SUCCESS"
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
                <TransferDialog
                  accounts={userAccounts}
                  accessToken={accessToken}
                />

                {/* Withdraw Dialog */}
                <WithdrawalDialog
                  accounts={userAccounts}
                  accessToken={accessToken}
                />
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
