"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import { Account } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";

interface TransferDialogProps {
  account?: Account; // optional: pre-selected "from account"
  accounts?: Account[]; // optional: pre-selected "from account"
  accessToken: string | null;
}

export default function TransferDialog({
  account,
  accounts,
  accessToken,
}: TransferDialogProps) {
  const [open, setOpen] = useState(false);
  const [fromAccount, setFromAccount] = useState(account?.rib ?? "");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account) setFromAccount(account.id);
  }, [account]);

  const handleConfirm = async () => {
    if (!fromAccount || !toAccount || !amount) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/transactions/transfer`,
        {
          fromAccountRib: fromAccount, // must be RIB, not id
          toAccountRib: toAccount,
          amount: Number(amount),
          description: note || "Transfer",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success response
      toast.success(`Transfer ${res.data.status}`);
      console.log("Transfer success:", res.data);

      // Reset fields
      if (!account) setFromAccount("");
      setToAccount("");
      setAmount("");
      setNote("");

      // Close dialog
      setOpen(false);
    } catch (err) {
      console.error("Transfer failed:", err);
      toast.error("Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full cursor-pointer gap-2 bg-transparent"
        >
          <ArrowRightLeft className="h-4 w-4" />
          <span className="hidden md:block ">Transfer</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Funds</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Show "From Account" only if no account prop is passed */}
          {!account && accounts && (
            <div>
              <Label htmlFor="transfer-from">From Account</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts
                    .filter((acc) => acc.rib)
                    .map((acc) => (
                      <SelectItem key={acc.id} value={acc.rib as string}>
                        {acc.type} ({acc.rib})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="transfer-to">To Account Number</Label>
            <Input
              id="transfer-to"
              type="text"
              placeholder="Enter destination account number"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="transfer-amount">Amount</Label>
            <Input
              id="transfer-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="transfer-note">Note (Optional)</Label>
            <Textarea
              id="transfer-note"
              placeholder="Add a note for this transfer"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1  bg-blue-500 hover:bg-blue-600"
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Confirm Transfer
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
      </DialogContent>
    </Dialog>
  );
}
