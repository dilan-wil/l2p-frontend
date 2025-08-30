"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle, DialogHeader } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, CheckCircle, Clock, FileText, Mail, Phone, User, XCircle, Eye, CreditCard, Users, UserCheck, DollarSign, UserX } from "lucide-react"
import { useEffect, useState } from "react"

export default function Page() {
    const [pendingUsers, setPendingUsers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [processingUserId, setProcessingUserId] = useState<string | null>(null)
    const [reviewingUser, setReviewingUser] = useState<any | null>(null)

    const handleApprove = (userId: string) => {
        setProcessingUserId(userId)
        // Simulate processing time
        setTimeout(() => {
        setPendingUsers(pendingUsers.map((user) => (user.id === userId ? { ...user, status: "approved" } : user)))
        setProcessingUserId(null)
        }, 2000)
    }

    const handleReject = (userId: string) => {
        setProcessingUserId(userId)
        // Simulate processing time
        setTimeout(() => {
        setPendingUsers(pendingUsers.map((user) => (user.id === userId ? { ...user, status: "rejected" } : user)))
        setProcessingUserId(null)
        }, 2000)
    }

    useEffect(() => {
        const loadPendingUsers = () => {
        setPendingUsers([
            {
            id: "1",
            fullName: "Marie Dubois",
            phoneNumber: "+237678901234",
            email: "marie.dubois@email.com",
            registrationDate: "2024-01-15",
            status: "pending",
            documents: ["ID Card", "Proof of Address", "Bank Statement"],
            personalInfo: {
                dateOfBirth: "1990-05-15",
                placeOfBirth: "Yaoundé, Cameroon",
                nationality: "Cameroonian",
                maritalStatus: "Single",
                profession: "Software Engineer",
                monthlyIncome: "800,000 FCFA",
                address: "123 Rue de la Paix, Bastos",
                city: "Yaoundé",
                postalCode: "BP 1234",
                idNumber: "CM123456789",
                idType: "National ID Card",
                emergencyContact: {
                name: "Jean Dubois",
                relationship: "Father",
                phone: "+237678901235",
                },
            },
            uploadedDocuments: {
                idCardFront: "/cameroon-national-id-front.png",
                idCardBack: "/cameroon-national-id-back.png",
                proofOfAddress: "/utility-bill-proof-of-address.png",
                bankStatement: "/generic-bank-statement.png",
            },
            },
            {
            id: "2",
            fullName: "Paul Ngono",
            phoneNumber: "+237687654321",
            email: "paul.ngono@email.com",
            registrationDate: "2024-01-14",
            status: "pending",
            documents: ["ID Card", "Proof of Address"],
            personalInfo: {
                dateOfBirth: "1985-08-22",
                placeOfBirth: "Douala, Cameroon",
                nationality: "Cameroonian",
                maritalStatus: "Married",
                profession: "Business Owner",
                monthlyIncome: "1,200,000 FCFA",
                address: "456 Avenue du Commerce, Akwa",
                city: "Douala",
                postalCode: "BP 5678",
                idNumber: "CM987654321",
                idType: "National ID Card",
                emergencyContact: {
                name: "Grace Ngono",
                relationship: "Spouse",
                phone: "+237687654322",
                },
            },
            uploadedDocuments: {
                idCardFront: "/cameroon-national-id-front.png",
                idCardBack: "/cameroon-national-id-back.png",
                proofOfAddress: "/utility-bill-proof-of-address.png",
            },
            },
            {
            id: "3",
            fullName: "Sarah Mballa",
            phoneNumber: "+237698765432",
            email: "sarah.mballa@email.com",
            registrationDate: "2024-01-13",
            status: "pending",
            documents: ["ID Card", "Proof of Address", "Bank Statement", "Employment Letter"],
            personalInfo: {
                dateOfBirth: "1992-12-03",
                placeOfBirth: "Bafoussam, Cameroon",
                nationality: "Cameroonian",
                maritalStatus: "Single",
                profession: "Teacher",
                monthlyIncome: "450,000 FCFA",
                address: "789 Rue de l'École, Centre-ville",
                city: "Bafoussam",
                postalCode: "BP 9012",
                idNumber: "CM456789123",
                idType: "National ID Card",
                emergencyContact: {
                name: "Pierre Mballa",
                relationship: "Brother",
                phone: "+237698765433",
                },
            },
            uploadedDocuments: {
                idCardFront: "/cameroon-national-id-front.png",
                idCardBack: "/cameroon-national-id-back.png",
                proofOfAddress: "/utility-bill-proof-of-address.png",
                bankStatement: "/generic-bank-statement.png",
                employmentLetter: "/employment-letter.png",
            },
            },
        ])
        setIsLoading(false)
        }

        loadPendingUsers()
    }, [])

    if (isLoading) {
        return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">Loading admin dashboard...</p>
            </div>
        </div>
        )
    }

    return(
        <main className="p-6 overflow-x-hidden">
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                KYC Management
              </h1>
              <p className="text-gray-600 mt-2">
                Review and approve user verification requests with detailed document analysis
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{20}</div>
                  <p className="text-xs text-muted-foreground">Registered accounts</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{20}</div>
                  <p className="text-xs text-muted-foreground">{Math.round((20 / 20) * 100)}% of total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <UserX className="h-4 w-4" />
                    Blocked Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{20}</div>
                  <p className="text-xs text-muted-foreground">{Math.round((20 / 20) * 100)}% of total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Total Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{20}</div>
                  <p className="text-xs text-muted-foreground">Across all accounts</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="flex items-center gap-3 text-gray-900">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span>Pending Verifications</span>
                    <Badge variant="secondary" className="ml-3 bg-orange-100 text-orange-700">
                      {pendingUsers.length} waiting
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Users waiting for account verification approval - review documents and personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {pendingUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">All caught up!</h3>
                    <p className="text-gray-500">No pending verification requests at the moment.</p>
                  </div>
                ) : (
                  <div className="w-full rounded-lg border border-gray-200">
                    <Table className="min-w-full table-fixed">
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="font-semibold text-gray-700">User Details</TableHead>
                          <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                          <TableHead className="font-semibold text-gray-700">Registration</TableHead>
                          <TableHead className="font-semibold text-gray-700">Documents</TableHead>
                          <TableHead className="font-semibold text-gray-700">Status</TableHead>
                          <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="w-full">
                        {pendingUsers.map((user) => (
                          <TableRow key={user.id} className="hover:bg-blue-50/50 transition-colors">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{user.fullName}</p>
                                  <p className="text-sm text-gray-500">ID: {user.id}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                  <Phone className="w-3 h-3 text-blue-600" />
                                  {user.phoneNumber}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Mail className="w-3 h-3" />
                                  {user.email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Calendar className="w-3 h-3 text-blue-600" />
                                {new Date(user.registrationDate).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {user.documents.map((doc: any, index: any) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs border-blue-200 text-blue-700"
                                  >
                                    <FileText className="w-3 h-3 mr-1" />
                                    {doc}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending Review
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                                      onClick={() => setReviewingUser(user)}
                                    >
                                      <Eye className="w-3 h-3 mr-1" />
                                      Review
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl max-h-[90vh]">
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center gap-2 text-xl">
                                        <CreditCard className="w-5 h-5 text-blue-600" />
                                        KYC Review - {user.fullName}
                                      </DialogTitle>
                                      <DialogDescription>
                                        Review personal information and uploaded documents to verify identity
                                      </DialogDescription>
                                    </DialogHeader>

                                    <ScrollArea className="max-h-[70vh]">
                                      <div className="space-y-6 p-1">
                                        {/* Personal Information Section */}
                                        <div>
                                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <User className="w-5 h-5 text-blue-600" />
                                            Personal Information
                                          </h3>
                                          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">Full Name</label>
                                              <p className="text-gray-900 font-medium">{user.fullName}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                                              <p className="text-gray-900">
                                                {new Date(user.personalInfo.dateOfBirth).toLocaleDateString()}
                                              </p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">
                                                Place of Birth
                                              </label>
                                              <p className="text-gray-900">{user.personalInfo.placeOfBirth}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">Nationality</label>
                                              <p className="text-gray-900">{user.personalInfo.nationality}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">ID Number</label>
                                              <p className="text-gray-900 font-mono">{user.personalInfo.idNumber}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">ID Type</label>
                                              <p className="text-gray-900">{user.personalInfo.idType}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">
                                                Marital Status
                                              </label>
                                              <p className="text-gray-900">{user.personalInfo.maritalStatus}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">Profession</label>
                                              <p className="text-gray-900">{user.personalInfo.profession}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">
                                                Monthly Income
                                              </label>
                                              <p className="text-gray-900 font-semibold">
                                                {user.personalInfo.monthlyIncome}
                                              </p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">Phone Number</label>
                                              <p className="text-gray-900">{user.phoneNumber}</p>
                                            </div>
                                            <div className="col-span-2">
                                              <label className="text-sm font-medium text-gray-600">Address</label>
                                              <p className="text-gray-900">
                                                {user.personalInfo.address}, {user.personalInfo.city}{" "}
                                                {user.personalInfo.postalCode}
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        <Separator />

                                        {/* Emergency Contact Section */}
                                        <div>
                                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Phone className="w-5 h-5 text-blue-600" />
                                            Emergency Contact
                                          </h3>
                                          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">Name</label>
                                              <p className="text-gray-900">{user.personalInfo.emergencyContact.name}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">Relationship</label>
                                              <p className="text-gray-900">
                                                {user.personalInfo.emergencyContact.relationship}
                                              </p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">Phone</label>
                                              <p className="text-gray-900">
                                                {user.personalInfo.emergencyContact.phone}
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        <Separator />

                                        {/* Documents Section */}
                                        <div>
                                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                            Uploaded Documents
                                          </h3>
                                          <div className="space-y-4">
                                            {/* ID Card Front & Back */}
                                            <div className="grid grid-cols-2 gap-4">
                                              <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-600">
                                                  ID Card (Front)
                                                </label>
                                                <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                                                  <img
                                                    src={user.uploadedDocuments.idCardFront || "/placeholder.svg"}
                                                    alt="ID Card Front"
                                                    className="w-full h-48 object-cover"
                                                  />
                                                </div>
                                              </div>
                                              <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-600">
                                                  ID Card (Back)
                                                </label>
                                                <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                                                  <img
                                                    src={user.uploadedDocuments.idCardBack || "/placeholder.svg"}
                                                    alt="ID Card Back"
                                                    className="w-full h-48 object-cover"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            {/* Other Documents */}
                                            <div className="grid grid-cols-1 gap-4">
                                              <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-600">
                                                  Proof of Address
                                                </label>
                                                <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                                                  <img
                                                    src={user.uploadedDocuments.proofOfAddress || "/placeholder.svg"}
                                                    alt="Proof of Address"
                                                    className="w-full h-32 object-cover"
                                                  />
                                                </div>
                                              </div>

                                              {user.uploadedDocuments.bankStatement && (
                                                <div className="space-y-2">
                                                  <label className="text-sm font-medium text-gray-600">
                                                    Bank Statement
                                                  </label>
                                                  <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                                                    <img
                                                      src={user.uploadedDocuments.bankStatement || "/placeholder.svg"}
                                                      alt="Bank Statement"
                                                      className="w-full h-32 object-cover"
                                                    />
                                                  </div>
                                                </div>
                                              )}

                                              {user.uploadedDocuments.employmentLetter && (
                                                <div className="space-y-2">
                                                  <label className="text-sm font-medium text-gray-600">
                                                    Employment Letter
                                                  </label>
                                                  <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                                                    <img
                                                      src={
                                                        user.uploadedDocuments.employmentLetter || "/placeholder.svg"
                                                      }
                                                      alt="Employment Letter"
                                                      className="w-full h-32 object-cover"
                                                    />
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        <Separator />

                                        {/* Action Buttons */}
                                        <div className="flex justify-end gap-3 pt-4">
                                          <Button
                                            variant="destructive"
                                            onClick={() => handleReject(user.id)}
                                            disabled={processingUserId === user.id}
                                            className="px-6"
                                          >
                                            <XCircle className="w-4 h-4 mr-2" />
                                            {processingUserId === user.id ? "Processing..." : "Reject Application"}
                                          </Button>
                                          <Button
                                            onClick={() => handleApprove(user.id)}
                                            disabled={processingUserId === user.id}
                                            className="bg-green-600 hover:bg-green-700 px-6"
                                          >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            {processingUserId === user.id ? "Processing..." : "Approve Application"}
                                          </Button>
                                        </div>
                                      </div>
                                    </ScrollArea>
                                  </DialogContent>
                                </Dialog>

                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(user.id)}
                                  disabled={processingUserId === user.id}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  {processingUserId === user.id ? "Processing..." : "Approve"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleReject(user.id)}
                                  disabled={processingUserId === user.id}
                                >
                                  <XCircle className="w-3 h-3 mr-1" />
                                  {processingUserId === user.id ? "Processing..." : "Reject"}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
    )
}