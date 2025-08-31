import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  CreditCard,
  FileCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Link from "next/link"

const mockAdminData = {
  stats: {
    totalMembers: 0,
    activeLoans: 0,
    pendingKyc: 0,
    monthlyDisbursements: 0,
    collections: 0,
    par30: 2.3,
  },
  recentActivity: [
    {
      id: "1",
      type: "kyc_approved",
      description: "KYC approved for Marie Dubois",
      time: "2 minutes ago",
      user: "Jean-Paul Mbeki",
    },
    {
      id: "2",
      type: "loan_disbursed",
      description: "Loan disbursed - 200,000 XAF",
      time: "15 minutes ago",
      user: "Sarah Nkomo",
    },
    {
      id: "3",
      type: "kyc_rejected",
      description: "KYC rejected for incomplete documents",
      time: "1 hour ago",
      user: "Jean-Paul Mbeki",
    },
    {
      id: "4",
      type: "payment_received",
      description: "Loan payment received - 12,500 XAF",
      time: "2 hours ago",
      user: "System",
    },
  ],
  alerts: [
    {
      id: "1",
      type: "warning",
      title: "High PAR30 Alert",
      message: "Portfolio at Risk (30 days) has increased to 2.3%",
      priority: "high",
    },
    {
      id: "2",
      type: "info",
      title: "KYC Queue Backlog",
      message: "23 KYC applications pending review",
      priority: "medium",
    },
    {
      id: "3",
      type: "success",
      title: "Monthly Target Achieved",
      message: "Disbursement target for January exceeded by 15%",
      priority: "low",
    },
  ],
}

export default function AdminDashboardPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of L2P Microfinance operations</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminData.stats.totalMembers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +0% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminData.stats.activeLoans}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +0% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminData.stats.pendingKyc}</div>
              <p className="text-xs text-muted-foreground">Requires review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PAR30</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminData.stats.par30}%</div>
              <p className="text-xs text-muted-foreground">Portfolio at Risk</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Disbursements</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(mockAdminData.stats.monthlyDisbursements)}
              </div>
              <p className="text-xs text-muted-foreground">January 2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collections</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(mockAdminData.stats.collections)}</div>
              <p className="text-xs text-muted-foreground">January 2024</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/activity">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "kyc_approved"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "loan_disbursed"
                            ? "bg-blue-100 text-blue-600"
                            : activity.type === "kyc_rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {activity.type === "kyc_approved" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : activity.type === "loan_disbursed" ? (
                        <DollarSign className="h-4 w-4" />
                      ) : activity.type === "kyc_rejected" ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Important notifications requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminData.alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        alert.type === "warning"
                          ? "bg-yellow-100 text-yellow-600"
                          : alert.type === "success"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {alert.type === "warning" ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : alert.type === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <Badge
                          variant={
                            alert.priority === "high"
                              ? "destructive"
                              : alert.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {alert.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex-col space-y-2" asChild>
                <Link href="/admin/kyc">
                  <FileCheck className="h-6 w-6" />
                  <span>Review KYC</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                <Link href="/admin/loans">
                  <CreditCard className="h-6 w-6" />
                  <span>Process Loans</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                <Link href="/admin/reports">
                  <TrendingUp className="h-6 w-6" />
                  <span>View Reports</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                <Link href="/admin/users">
                  <Users className="h-6 w-6" />
                  <span>Manage Users</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
