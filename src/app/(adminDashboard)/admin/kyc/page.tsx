"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, CheckCircle, Clock, FileText, Mail, Phone, User, XCircle, Eye, CreditCard, Users, UserCheck, DollarSign, UserX, Dot, Ellipsis } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/auth-context"
import axios from "axios"

export default function Page() {
    const [pendingUsers, setPendingUsers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [processingUserId, setProcessingUserId] = useState<string | null>(null)
    const [pendingVerifications, setPendingVerifications] = useState<any>([])
    const [reviewingUser, setReviewingUser] = useState<any | null>(null)
    const { accessToken, user } = useAuth()
    useEffect(() => {
      
    }, [])

    const handleApprove = async (userId: string) => {
      try {
        setProcessingUserId(userId);

        // Call your API
        const verifiedBy = user?.id; // or dynamically
        const url = `https://l2p-cooperative-backend.onrender.com/users-verification/${userId.trim()}/approve?verifiedBy=${verifiedBy}`;

        const res = await axios.patch(url, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // if needed
          },
        });
        console.log(res)

        if (res.status === 200) {
          // Update local state
          setPendingUsers((prev) =>
            prev.map((user) =>
              user.id === userId ? { ...user, status: "approved" } : user
            )
          );
        } else {
          console.error("Failed to approve user:", res.data);
        }
      } catch (error) {
        console.error("Error approving user:", error);
      } finally {
        setProcessingUserId(null);
      }
    };

    const handleReject = async (userId: string) => {
        try {
        setProcessingUserId(userId);

        // Call your API
        const verifiedBy = user?.id; // or dynamically
        const url = `https://l2p-cooperative-backend.onrender.com/users-verification/${userId.trim()}/reject?verifiedBy=${verifiedBy}`;

        const res = await axios.patch(url, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // if needed
          },
        });
        console.log(res)

        if (res.status === 200) {
          // Update local state
          setPendingUsers((prev) =>
            prev.map((user) =>
              user.id === userId ? { ...user, status: "approved" } : user
            )
          );
        } else {
          console.error("Failed to approve user:", res.data);
        }
      } catch (error) {
        console.error("Error approving user:", error);
      } finally {
        setProcessingUserId(null);
      }
    }

    useEffect(() => {
      if(!accessToken) return
      const fetchVerifications = async () => {
        try {
          const res = await axios.get("https://l2p-cooperative-backend.onrender.com/users-verification?page=1&size=10", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          console.log(res.data.data)
          console.log(res.data.data.map(mapVerificationToUser))

          // Map API response into UI users
          const mapped = res.data.data.map(mapVerificationToUser)

          setPendingVerifications(mapped)
        } catch (error) {
          console.error("Error fetching verifications:", error)
        }
      }

      fetchVerifications()
      setIsLoading(false)
    }, [accessToken])


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
                      {pendingVerifications.length} waiting
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Users waiting for account verification approval - review documents and personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {pendingVerifications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">All caught up!</h3>
                    <p className="text-gray-500">No pending verification requests at the moment.</p>
                  </div>
                ) : (
                  <div className="w-full rounded-lg border border-gray-200">
                    <Table className="min-w-full">
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
                        {pendingVerifications.map((user: any) => (
                          <TableRow key={user.id} className="hover:bg-blue-50/50 transition-colors">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div>
                                  <p className="font-semibold text-gray-900">{user.fullName}</p>
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
                              {user.status === "APPROVED" ? (
                                <Badge
                                  variant="outline"
                                  className="text-green-600 border-green-200 bg-green-50"
                                >
                                  Approved
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-orange-600 border-orange-200 bg-orange-50"
                                >
                                  <Clock className="w-3 h-3 mr-1" /> Pending
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Sheet>
                                  <SheetTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                                      onClick={() => setReviewingUser(user)}
                                    >
                                      <Ellipsis className="w-3 h-3 mr-1" />
                                    </Button>
                                  </SheetTrigger>
                                  <SheetContent className="max-w-4xl pb-10">
                                    <SheetHeader>
                                      <SheetTitle className="flex items-center gap-2 text-xl">
                                        <CreditCard className="w-5 h-5 text-blue-600" />
                                        KYC Review - {user.fullName}
                                      </SheetTitle>
                                      <SheetDescription>
                                        Review personal information and uploaded documents to verify identity
                                      </SheetDescription>
                                      <div className="w-full border-gray-200 flex gap-3 shadow-sm">
                                        <Button
                                          variant="destructive"
                                          onClick={() => handleReject(user.id)}
                                          disabled={processingUserId === user.id}
                                          className="flex-1 px-6"
                                        >
                                          <XCircle className="w-4 h-4 mr-2" />
                                          {processingUserId === user.userId ? "Processing..." : "Reject"}
                                        </Button>

                                        <Button
                                          onClick={() => handleApprove(user.userId)}
                                          disabled={processingUserId === user.userId}
                                          className="flex-1 bg-green-600 hover:bg-green-700 px-6"
                                        >
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          {processingUserId === user.userId ? "Processing..." : "Approve"}
                                        </Button>
                                      </div>
                                    </SheetHeader>
                                    

                                    <ScrollArea className="max-h-[100vh]">
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
                                            Documents
                                          </h3>
                                          <div className="space-y-4">
                                            {/* ID Card Front & Back */}
                                            <div className="grid grid-cols-2 gap-4">
                                              <div className="space-y-2 cursor-pointer">
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
                                            {/* <div className="grid grid-cols-1 gap-4">
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
                                            </div> */}
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
                                  </SheetContent>
                                </Sheet>

                                {/* <Button
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
                                </Button> */}
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

const mapVerificationToUser = (verification: any) => {
  const profile = verification.user.profile
  const documents = verification.user.documents

  return {
    id: verification.id,
    userId: verification.userId,
    fullName: `${profile.firstName} ${profile.lastName}`,
    email: verification.user.email,
    phoneNumber: profile.phone,
    registrationDate: verification.createdAt,
    documents: documents ? [documents.type] : [],
    status: verification.status,
    personalInfo: {
      dateOfBirth: profile.birthDate,
      placeOfBirth: profile.birthPlace,
      nationality: profile.nationality,
      idNumber: profile.idNumber,
      idType: documents?.type || "N/A",
      maritalStatus: profile.maritalStatus,
      profession: profile.profession,
      monthlyIncome: profile.salary,
      address: profile.address,
      city: profile.city,
      postalCode: "", // not in API, so leave empty
      emergencyContact: {
        name: "N/A", // your API doesn’t give this, placeholder
        relationship: "N/A",
        phone: "N/A",
      },
    },
    uploadedDocuments: {
      idCardFront: documents?.frontImage,
      idCardBack: documents?.backImage,
      proofOfAddress: null, // not provided in your API
      bankStatement: null,
      employmentLetter: null,
    },
  }
}