"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Shield,
  Activity,
  Eye,
  Clock,
} from "lucide-react"

const mockUsers = [
  {
    id: "USR001",
    name: "Jean-Paul Mbeki",
    email: "jp.mbeki@l2p.com",
    role: "Branch Manager",
    branch: "Douala Central",
    status: "active",
    lastLogin: "2024-01-15 14:30",
    createdDate: "2023-01-15",
    permissions: ["kyc_review", "loan_approval", "user_management", "reports"],
  },
  {
    id: "USR002",
    name: "Sarah Nkomo",
    email: "sarah.nkomo@l2p.com",
    role: "Loan Officer",
    branch: "Douala Central",
    status: "active",
    lastLogin: "2024-01-15 16:45",
    createdDate: "2023-03-20",
    permissions: ["kyc_review", "loan_processing"],
  },
  {
    id: "USR003",
    name: "Marie Talla",
    email: "marie.talla@l2p.com",
    role: "KYC Specialist",
    branch: "Yaoundé North",
    status: "active",
    lastLogin: "2024-01-15 09:15",
    createdDate: "2023-06-10",
    permissions: ["kyc_review", "document_verification"],
  },
  {
    id: "USR004",
    name: "Paul Essomba",
    email: "paul.essomba@l2p.com",
    role: "Teller",
    branch: "Douala Central",
    status: "inactive",
    lastLogin: "2024-01-10 11:20",
    createdDate: "2023-08-05",
    permissions: ["transaction_processing"],
  },
]

const mockActivityLogs = [
  {
    id: "LOG001",
    user: "Jean-Paul Mbeki",
    action: "Approved KYC application",
    details: "KYC001 - Marie Dubois",
    timestamp: "2024-01-15 14:35:22",
    ipAddress: "192.168.1.100",
  },
  {
    id: "LOG002",
    user: "Sarah Nkomo",
    action: "Processed loan application",
    details: "LN003 - Business loan 500,000 XAF",
    timestamp: "2024-01-15 16:20:15",
    ipAddress: "192.168.1.101",
  },
  {
    id: "LOG003",
    user: "Marie Talla",
    action: "Rejected KYC application",
    details: "KYC005 - Incomplete documents",
    timestamp: "2024-01-15 09:45:33",
    ipAddress: "192.168.1.102",
  },
  {
    id: "LOG004",
    user: "Jean-Paul Mbeki",
    action: "Created new user account",
    details: "USR005 - New teller account",
    timestamp: "2024-01-15 08:15:44",
    ipAddress: "192.168.1.100",
  },
]

const roles = [
  {
    name: "Branch Manager",
    permissions: ["kyc_review", "loan_approval", "user_management", "reports", "reconciliation"],
  },
  {
    name: "Loan Officer",
    permissions: ["kyc_review", "loan_processing", "reports"],
  },
  {
    name: "KYC Specialist",
    permissions: ["kyc_review", "document_verification"],
  },
  {
    name: "Teller",
    permissions: ["transaction_processing", "customer_service"],
  },
  {
    name: "Auditor",
    permissions: ["reports", "activity_logs", "reconciliation"],
  },
]

export default function UserManagementPage() {
  const [users, setUsers] = useState(mockUsers)
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    branch: "",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = () => {
    const newUserId = `USR${String(users.length + 1).padStart(3, "0")}`
    const rolePermissions = roles.find((r) => r.name === newUser.role)?.permissions || []

    const userToAdd = {
      id: newUserId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      branch: newUser.branch,
      status: "active" as const,
      lastLogin: "Never",
      createdDate: new Date().toISOString().split("T")[0],
      permissions: rolePermissions,
    }

    setUsers([...users, userToAdd])
    setNewUser({ name: "", email: "", role: "", branch: "" })
    setIsAddUserOpen(false)
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        <UserCheck className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        <UserX className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    )
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage staff accounts, roles, and permissions</p>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new staff account with appropriate role and permissions</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.name} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={newUser.branch} onValueChange={(value) => setNewUser({ ...newUser, branch: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Douala Central">Douala Central</SelectItem>
                      <SelectItem value="Yaoundé North">Yaoundé North</SelectItem>
                      <SelectItem value="Bafoussam">Bafoussam</SelectItem>
                      <SelectItem value="Garoua">Garoua</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddUser}
                  disabled={!newUser.name || !newUser.email || !newUser.role || !newUser.branch}
                >
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name, email, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Staff Members ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.id} • {user.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.role} • {user.branch}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(user.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setIsEditUserOpen(true)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                            {user.status === "active" ? (
                              <>
                                <UserX className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Details */}
          <Card>
            <CardHeader>
              <CardTitle>User Details</CardTitle>
              <CardDescription>
                {selectedUser ? "Selected user information" : "Select a user to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedUser ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{selectedUser.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID:</span>
                        <span>{selectedUser.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{selectedUser.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Role:</span>
                        <span>{selectedUser.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Branch:</span>
                        <span>{selectedUser.branch}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        {getStatusBadge(selectedUser.status)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Login:</span>
                        <span>{selectedUser.lastLogin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{selectedUser.createdDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Permissions
                    </h4>
                    <div className="space-y-1">
                      {selectedUser.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="mr-1 mb-1 text-xs">
                          {permission.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Edit User
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedUser.status === "active" ? "destructive" : "default"}
                      className="flex-1"
                      onClick={() => handleToggleUserStatus(selectedUser.id)}
                    >
                      {selectedUser.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a user from the list to view their details and manage permissions.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Logs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>User actions and system events</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              View All Logs
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivityLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">{log.details}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.user} • {log.timestamp} • {log.ipAddress}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
