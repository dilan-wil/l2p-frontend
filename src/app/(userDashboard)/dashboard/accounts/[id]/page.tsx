"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CreditCard,
  Wallet,
  TrendingUp,
  Plus,
  ArrowRightLeft,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/auth-context";
import { maskCardNumber } from "@/functions/maskCardNumber";
import { formatCurrency } from "@/functions/formatCurrency";
import DepositDialog from "@/components/dialogs/deposit-dialog";
import TransferDialog from "@/components/dialogs/transfer-dialog";

interface Account {
  id: string;
  name: string;
  type: "Savings" | "Checking" | "Investment";
  accountNumber: string;
  balance: number;
}

interface Transaction {
  id: string;
  date: string;
  type: "Deposit" | "Withdrawal" | "Transfer In" | "Transfer Out";
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  description: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "Deposit",
    amount: 2500.0,
    status: "Completed",
    description: "Salary deposit",
  },
  {
    id: "2",
    date: "2024-01-14",
    type: "Transfer Out",
    amount: -500.0,
    status: "Completed",
    description: "Transfer to savings",
  },
  {
    id: "3",
    date: "2024-01-12",
    type: "Withdrawal",
    amount: -120.5,
    status: "Completed",
    description: "ATM withdrawal",
  },
  {
    id: "4",
    date: "2024-01-10",
    type: "Transfer In",
    amount: 1000.0,
    status: "Pending",
    description: "Investment return",
  },
];

const getAccountIcon = (type: string) => {
  switch (type) {
    case "Checking":
      return <CreditCard className="h-6 w-6" />;
    case "Savings":
      return <Wallet className="h-6 w-6" />;
    case "Investment":
      return <TrendingUp className="h-6 w-6" />;
    default:
      return <CreditCard className="h-6 w-6" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getTransactionColor = (amount: number) => {
  return amount > 0
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
};

export default function AccountViewPage() {
  const params = useParams();
  const accountId = params.id as string;
  const { userAccounts, accessToken } = useAuth();
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositNote, setDepositNote] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferToAccount, setTransferToAccount] = useState("");
  const [transferNote, setTransferNote] = useState("");

  const currentAccount = userAccounts.find(
    (account) => account.id === accountId
  );
  const otherAccounts = userAccounts.filter(
    (account) => account.id !== accountId
  );

  if (!currentAccount) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Account Not Found</h1>
          <p className="text-muted-foreground mt-2">
            The requested account could not be found.
          </p>
          <Link href="/accounts">
            <Button className="mt-4">Back to Accounts</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDeposit = () => {
    if (!depositAmount) {
      //   toast({
      //     title: "Error",
      //     description: "Please enter an amount",
      //     variant: "destructive",
      //   });
      return;
    }

    // toast({
    //   title: "Deposit Successful",
    //   description: `$${depositAmount} deposited to ${currentAccount.name}`,
    // });

    setDepositDialogOpen(false);
    setDepositAmount("");
    setDepositNote("");
  };

  const handleTransfer = () => {
    if (!transferToAccount || !transferAmount) {
      //   toast({
      //     title: "Error",
      //     description: "Please select an account and enter an amount",
      //     variant: "destructive",
      //   });
      return;
    }

    const toAccount = userAccounts.find((a) => a.id === transferToAccount);

    // toast({
    //   title: "Transfer Successful",
    //   description: `$${transferAmount} transferred from ${currentAccount.name} to ${toAccount?.name}`,
    // });

    setTransferDialogOpen(false);
    setTransferAmount("");
    setTransferToAccount("");
    setTransferNote("");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-balance">
            {currentAccount.type}
          </h1>
          <p className="text-muted-foreground mt-1">
            Account Details & Transactions
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">Account Information</CardTitle>
              {getAccountIcon(currentAccount.type)}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Account Type</p>
                <Badge className="mt-1">{currentAccount.type}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Number</p>
                <p className="font-mono text-sm mt-1">
                  {maskCardNumber(currentAccount.rib ?? "")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-2xl font-bold mt-1 text-balance">
                  {formatCurrency(Number(currentAccount.balance))}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <DepositDialog
                  accessToken={accessToken}
                  account={currentAccount}
                />

                <TransferDialog account={currentAccount} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-medium">{transaction.description}</p>
                        <Badge
                          className={getStatusColor(transaction.status)}
                          variant="secondary"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{transaction.type}</span>
                        <span>•</span>
                        <span>
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-semibold ${getTransactionColor(
                          transaction.amount
                        )}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
