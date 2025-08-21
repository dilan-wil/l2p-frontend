"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Eye, CheckCircle, XCircle, Clock, Search, FileText, Camera, Home, CreditCard } from "lucide-react"

const mockKycApplications = [
  {
    id: "KYC001",
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "+237 677 123 456",
    status: "pending",
    submittedDate: "2024-01-15",
    documents: {
      nationalIdFront: "/generic-identification-card-front.png",
      nationalIdBack: "/national-id-back.png",
      selfie: "/selfie-photo.png",
      proofOfAddress: "/utility-bill-documents.png",
      payslip: "/placeholder-zvvtn.png",
    },
    personalInfo: {
      fullName: "Marie Dubois",
      dateOfBirth: "1985-03-15",
      address: "123 Rue de la Paix, Douala",
      city: "Douala",
      referralCode: "REF123",
    },
  },
  {
    id: "KYC002",
    name: "Paul Nkomo",
    email: "paul.nkomo@email.com",
    phone: "+237 655 987 654",
    status: "pending",
    submittedDate: "2024-01-14",
    documents: {
      nationalIdFront: "/generic-identification-card-front.png",
      nationalIdBack: "/national-id-back.png",
      selfie: "/selfie-photo.png",
      proofOfAddress: "/utility-bill-documents.png",
    },
    personalInfo: {
      fullName: "Paul Nkomo",
      dateOfBirth: "1990-07-22",
      address: "456 Avenue des Cocotiers, Yaoundé",
      city: "Yaoundé",
    },
  },
  {
    id: "KYC003",
    name: "Sarah Mbeki",
    email: "sarah.mbeki@email.com",
    phone: "+237 699 111 222",
    status: "approved",
    submittedDate: "2024-01-13",
    reviewedDate: "2024-01-14",
    reviewedBy: "Jean-Paul Mbeki",
    documents: {
      nationalIdFront: "/generic-identification-card-front.png",
      nationalIdBack: "/national-id-back.png",
      selfie: "/selfie-photo.png",
      proofOfAddress: "/utility-bill-documents.png",
    },
    personalInfo: {
      fullName: "Sarah Mbeki",
      dateOfBirth: "1988-11-05",
      address: "789 Boulevard du 20 Mai, Douala",
      city: "Douala",
    },
  },
]

export default function KycQueuePage() {
  const [applications, setApplications] = useState(mockKycApplications)
  const [selectedApplication, setSelectedApplication] = useState<(typeof mockKycApplications)[0] | null>(null)
  const [reviewComment, setReviewComment] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleApprove = () => {
    if (selectedApplication) {
      
      setSelectedApplication(null)
      setReviewComment("")
    }
  }

  const handleReject = () => {
    if (selectedApplication) {
      
      setSelectedApplication(null)
      setReviewComment("")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">KYC Queue</h1>
          <p className="text-muted-foreground">Review and process member verification applications</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Applications</CardTitle>
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
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>KYC Applications ({filteredApplications.length})</CardTitle>
            <CardDescription>Click on an application to review documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{application.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {application.id} • {application.email}
                      </p>
                      <p className="text-xs text-muted-foreground">Submitted: {application.submittedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(application.status)}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                          disabled={application.status !== "pending"}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>KYC Review - {selectedApplication?.name}</DialogTitle>
                          <DialogDescription>Review the submitted documents and personal information</DialogDescription>
                        </DialogHeader>

                        {selectedApplication && (
                          <div className="space-y-6">
                            {/* Personal Information */}
                            <div>
                              <h3 className="font-semibold mb-3">Personal Information</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Full Name:</span>
                                  <p className="font-medium">{selectedApplication.personalInfo.fullName}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Date of Birth:</span>
                                  <p className="font-medium">{selectedApplication.personalInfo.dateOfBirth}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Phone:</span>
                                  <p className="font-medium">{selectedApplication.phone}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Email:</span>
                                  <p className="font-medium">{selectedApplication.email}</p>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Address:</span>
                                  <p className="font-medium">{selectedApplication.personalInfo.address}</p>
                                </div>
                              </div>
                            </div>

                            {/* Documents */}
                            <div>
                              <h3 className="font-semibold mb-3">Submitted Documents</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DocumentCard
                                  title="National ID (Front)"
                                  icon={<CreditCard className="w-4 h-4" />}
                                  imageUrl={selectedApplication.documents.nationalIdFront}
                                />
                                <DocumentCard
                                  title="National ID (Back)"
                                  icon={<CreditCard className="w-4 h-4" />}
                                  imageUrl={selectedApplication.documents.nationalIdBack}
                                />
                                <DocumentCard
                                  title="Selfie Photo"
                                  icon={<Camera className="w-4 h-4" />}
                                  imageUrl={selectedApplication.documents.selfie}
                                />
                                <DocumentCard
                                  title="Proof of Address"
                                  icon={<Home className="w-4 h-4" />}
                                  imageUrl={selectedApplication.documents.proofOfAddress}
                                />
                                {selectedApplication.documents.payslip && (
                                  <DocumentCard
                                    title="Income Proof"
                                    icon={<FileText className="w-4 h-4" />}
                                    imageUrl={selectedApplication.documents.payslip}
                                  />
                                )}
                              </div>
                            </div>

                            {/* Review Comment */}
                            <div>
                              <Label htmlFor="comment">Review Comment</Label>
                              <Textarea
                                id="comment"
                                placeholder="Add a comment about your decision..."
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                rows={3}
                              />
                            </div>
                          </div>
                        )}

                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleReject}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button onClick={handleApprove}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

interface DocumentCardProps {
  title: string
  icon: React.ReactNode
  imageUrl: string
}

function DocumentCard({ title, icon, imageUrl }: DocumentCardProps) {
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-32 object-cover rounded border" />
    </div>
  )
}
