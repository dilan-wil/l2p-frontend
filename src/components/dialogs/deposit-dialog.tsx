"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Smartphone, Wallet } from "lucide-react";
import { Account } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { maskCardNumber } from "@/functions/maskCardNumber";

const baseUrl = "https://l2p-cooperative-backend.onrender.com"; // put your API base url here

interface DepositDialogProps {
  accounts?: Account[];
  account?: Account; // optional: pre-selected account
  accessToken: string | null;
}

export default function DepositDialog({
  accounts,
  account,
  accessToken,
}: DepositDialogProps) {
  const [open, setOpen] = useState(false);
  const [accountId, setAccountId] = useState(account?.id ?? "");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"mtn" | "orange" | "">("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // Handle deposit confirm
  const handleDeposit = async () => {
    if (!accountId || !amount || !phoneNumber || !method) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      console.log({ accountId, amount, phoneNumber, method, accessToken });
      const res = await axios.post(
        `${baseUrl}/accounts/deposit?accountId=${accountId}&amount=${amount}&phoneNumber=${phoneNumber}&method=${method}`,
        {}, // no body needed since API uses query params
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = res.data;

      // Save to localStorage
      const pendingDeposits = JSON.parse(
        localStorage.getItem("pendingDeposits") || "[]"
      );
      localStorage.setItem(
        "pendingDeposits",
        JSON.stringify([...pendingDeposits, data])
      );

      setTransactionId(data.transactionId);
      setWaiting(true);
    } catch (err) {
      console.error(err);
      toast.error("Deposit request failed");
    } finally {
      setLoading(false);
    }
  };

  // Polling check-deposit-status with axios
  useEffect(() => {
    if (!waiting || !transactionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/accounts/check-deposit-status?transactionId=${transactionId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const statusData = res.data;
        console.log(statusData);
        if (statusData.status === "SUCCESS") {
          toast.success("Deposit successful!");
          clearInterval(interval);
          setOpen(false);
          setWaiting(false);
          setTransactionId(null);
        }
      } catch (err) {
        console.error("Check status failed", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [waiting, transactionId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 gap-2">
          <Wallet className="h-4 w-4" />
          <span className="hidden md:block ">Deposit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {waiting
              ? "Waiting for Payment"
              : account
              ? `Deposit into ${account.type} - ${maskCardNumber(
                  account.rib ?? ""
                )}`
              : "Make a Deposit"}
          </DialogTitle>
        </DialogHeader>

        {!waiting ? (
          <div className="space-y-4 pt-4">
            {!account && accounts && (
              <div>
                <Label htmlFor="deposit-account">Select Account</Label>
                <Select value={accountId} onValueChange={setAccountId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts
                      .filter((acc) => acc.rib)
                      .map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.type} ({acc.rib})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <Label>Payment Method</Label>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={method === "mtn"}
                    onCheckedChange={() => setMethod("mtn")}
                  />
                  <span className="flex items-center gap-1">
                    <Smartphone className="h-4 w-4 text-yellow-500" />
                    MTN
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={method === "orange"}
                    onCheckedChange={() => setMethod("orange")}
                  />
                  <span className="flex items-center gap-1">
                    <Smartphone className="h-4 w-4 text-orange-500" />
                    Orange
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleDeposit}
                disabled={loading}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Confirm Deposit
              </Button>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></span>
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></span>
            </div>
            <p className="text-center text-sm text-gray-600">
              Do not close this dialog. Waiting for payment confirmation to
              finalise your deposit...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
