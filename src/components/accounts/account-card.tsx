"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import {    
    Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent, } from "../ui/card"
import { Calendar, Eye, Loader2 } from "lucide-react"
import { Account } from "@/types/types"
import { useAuth } from "@/hooks/auth-context"

export default function AccountCard({ account, config } : {account: Account, config: any}) {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<string>("")
  const { openAccount } = useAuth()
  const getAccountStatusColor = (active: boolean) => {
    return active
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  const createAccount = async () => {
    if (!selectedBranch) return
    setIsLoading(true)
    try {
      await openAccount(account.type, selectedBranch === "yassa" ? "00077" : "00067")
      setOpenDialog(false)
      router.refresh() // refresh the page or fetch accounts again
    } catch (err) {
      console.error("Failed to open account", err)
    }
    setIsLoading(false)
  }

  return (
    <>
      <Card key={account.id} className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config.color} text-white`}>
                <config.icon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">{config.label}</CardTitle>
                <CardDescription>
                  {account.rib ? `Account Number: XAF ${account.rib}` : "No Account Yet"}
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
                onClick={() => setOpenDialog(true)}
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

      {/* Branch Selection Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a Branch</DialogTitle>
            <DialogDescription>
              Please select a branch to open your {config.label} account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            {["Yassa", "Bonamoussadi"].map((branch) => (
              <Button
                key={branch}
                variant={selectedBranch === branch ? "default" : "outline"}
                onClick={() => setSelectedBranch(branch)}
              >
                {branch}
              </Button>
            ))}
            <Button
              disabled={!selectedBranch || isLoading}
              className="mt-4"
              onClick={createAccount}
            >
              {isLoading ? <Loader2 className="animate-spin"/> : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
