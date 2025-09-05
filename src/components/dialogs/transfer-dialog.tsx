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
import { ArrowRightLeft } from "lucide-react";
import { Account } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TransferDialogProps {
  account?: Account; // optional: pre-selected "from account"
  accounts?: Account[]; // optional: pre-selected "from account"
}

export default function TransferDialog({
  account,
  accounts,
}: TransferDialogProps) {
  const [open, setOpen] = useState(false);
  const [fromAccount, setFromAccount] = useState(account?.id ?? "");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (account) setFromAccount(account.id);
  }, [account]);

  const handleConfirm = () => {
    if (!fromAccount || !toAccount || !amount) {
      alert("Please fill all required fields.");
      return;
    }

    // here goes your transfer logic
    console.log("Transfer confirmed:", {
      fromAccount,
      toAccount,
      amount,
      note,
    });

    // reset fields
    if (!account) setFromAccount("");
    setToAccount("");
    setAmount("");
    setNote("");

    // close dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <ArrowRightLeft className="h-4 w-4" />
          Transfer
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
                      <SelectItem key={acc.id} value={acc.id}>
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
            <Button onClick={handleConfirm} className="flex-1">
              Confirm Transfer
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
