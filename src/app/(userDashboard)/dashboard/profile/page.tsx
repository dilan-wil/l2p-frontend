"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Camera,
  Upload,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  View,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/auth-context";
import { getInitials } from "@/functions/getInitials";
import { Separator } from "@/components/ui/separator";
import { maskCardNumber } from "@/functions/maskCardNumber";
import { formatCurrency } from "@/functions/formatCurrency";

// Mock user data
const mockUserData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    dateOfBirth: "1990-05-15",
    gender: "male",
    nationality: "United States",
    maritalStatus: "single",
  },
  contactInfo: {
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    street: "123 Main Street",
    city: "New York",
    zipCode: "10001",
    country: "United States",
  },
  emergencyContact: {
    name: "Jane Doe",
    relationship: "sister",
    phone: "+1 (555) 987-6543",
    email: "jane.doe@email.com",
  },
  professionalInfo: {
    occupation: "Software Engineer",
    employer: "Tech Corp Inc.",
    monthlyIncome: "8500",
    sourceOfFunds: "salary",
  },
  documents: {
    idCard: { status: "verified", uploadDate: "2024-01-15" },
    proofOfAddress: { status: "pending", uploadDate: "2024-01-20" },
    taxId: "***-**-1234",
  },
  settings: {
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    language: "en",
    timezone: "America/New_York",
  },
};

export default function ProfilePage() {
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const { user, userAccounts } = useAuth();

  const handleSave = (section: string) => {
    toast.success(`Your ${section} has been successfully updated.`);

    setIsEditing(false);
  };

  const handleUpload = (documentType: string) => {
    toast.success(
      `Your ${documentType} has been uploaded and is being reviewed.`
    );
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">Not Uploaded</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and account settings
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/professional-headshot.png" />
                  <AvatarFallback>
                    {getInitials(user?.profile.firstName ?? "")}
                  </AvatarFallback>
                </Avatar>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Profile Picture</DialogTitle>
                      <DialogDescription>
                        Upload a new profile picture. Recommended size:
                        400x400px
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                      </div>
                      <Button onClick={() => handleUpload("profile picture")}>
                        Upload Photo
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Personal Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue={user?.profile.firstName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user?.profile.lastName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue={user?.username ?? ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    defaultValue={
                      user?.profile.birthDate
                        ? new Date(user.profile.birthDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select defaultValue={"male"}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    defaultValue={user?.profile.nationality}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select defaultValue={user?.profile.maritalStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={() => handleSave("personal information")}
                className="w-full md:w-auto"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Information Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Manage your contact details and emergency contact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={user?.profile.phone} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" defaultValue={user?.profile.address} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={user?.profile.city} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" defaultValue={user?.profile.address} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue={"Cameroon"} />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Emergency Contact
                </h3>
                <div className="space-y-4">
                  {user?.contacts.map((contact, index) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`emergencyName-${index}`}>
                          Contact Name
                        </Label>
                        <Input
                          id={`emergencyName-${index}`}
                          defaultValue={contact.name}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`relationship-${index}`}>
                          Relationship
                        </Label>
                        <Input
                          id={`relationship-${index}`}
                          defaultValue={contact.relation}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`emergencyPhone-${index}`}>
                          Phone Number
                        </Label>
                        <Input
                          id={`emergencyPhone-${index}`}
                          defaultValue={contact.phone}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`emergencyEmail-${index}`}>
                          Email (Optional)
                        </Label>
                        <Input
                          id={`emergencyEmail-${index}`}
                          type="email"
                          defaultValue={contact.email}
                        />
                      </div>
                      {/* Separator with gap */}
                      {index < user.contacts.length - 1 && (
                        <div className="w-full">
                          <Separator />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => handleSave("contact information")}
                className="w-full md:w-auto"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Information Tab */}
        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional & Financial Information</CardTitle>
              <CardDescription>
                Update your employment and financial details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation / Job Title</Label>
                  <Input
                    id="occupation"
                    defaultValue={user?.profile.profession}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer / Company Name</Label>
                  <Input id="employer" defaultValue={user?.profile.employer} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (XAF)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    defaultValue={user?.profile.salary}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sourceOfFunds">Source of Funds</Label>
                  <Select
                    defaultValue={userData.professionalInfo.sourceOfFunds}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="business">Business Income</SelectItem>
                      <SelectItem value="investments">Investments</SelectItem>
                      <SelectItem value="inheritance">Inheritance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Bank Accounts Overview
                </h3>
                <div className="space-y-3">
                  {userAccounts
                    .filter((acc) => acc.rib)
                    .map((acc) => (
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{acc.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {maskCardNumber(acc.rib ?? "")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(Number(acc.balance))}
                          </p>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <Button
                onClick={() => handleSave("professional information")}
                className="w-full md:w-auto"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>ID & Verification Documents</CardTitle>
              <CardDescription>
                Upload and manage your identification documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">ID Card / Passport</p>
                      <p className="text-sm text-muted-foreground">
                        View and update your document
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getVerificationBadge(userData.documents.idCard.status)}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Your Uploaded Documents</DialogTitle>
                          <DialogDescription>
                            Here you can view the ID documents you previously
                            uploaded.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Front Side */}
                            <div className="border-2 border-muted-foreground/25 rounded-lg p-4 text-center">
                              {user?.documents?.frontImage ? (
                                <img
                                  src={user.documents.frontImage}
                                  alt="Front Side"
                                  className="mx-auto mb-2 max-h-32 object-contain"
                                />
                              ) : (
                                <p className="text-xs text-muted-foreground">
                                  No Front Side Uploaded
                                </p>
                              )}
                              <p className="text-xs font-medium">Front Side</p>
                            </div>

                            {/* Back Side */}
                            <div className="border-2 border-muted-foreground/25 rounded-lg p-4 text-center">
                              {user?.documents?.backImage ? (
                                <img
                                  src={user.documents.backImage}
                                  alt="Back Side"
                                  className="mx-auto mb-2 max-h-32 object-contain"
                                />
                              ) : (
                                <p className="text-xs text-muted-foreground">
                                  No Back Side Uploaded
                                </p>
                              )}
                              <p className="text-xs font-medium">Back Side</p>
                            </div>
                          </div>

                          {/* Optional: Close button */}
                          <Button>Close</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Proof of Address</p>
                      <p className="text-sm text-muted-foreground">
                        Utility bill or bank statement
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getVerificationBadge(
                      userData.documents.proofOfAddress.status
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload Proof of Address</DialogTitle>
                          <DialogDescription>
                            Upload a recent utility bill, bank statement, or
                            official document showing your address
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Click to upload or drag and drop
                            </p>
                          </div>
                          <Button
                            onClick={() => handleUpload("proof of address")}
                            className="w-full"
                          >
                            Upload Document
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / Social Security Number</Label>
                  <Input
                    id="taxId"
                    defaultValue={""}
                    placeholder="Enter your tax ID"
                  />
                </div>
              </div>

              <Button
                onClick={() => handleSave("documents")}
                className="w-full md:w-auto"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings & Security</CardTitle>
              <CardDescription>
                Manage your security settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Change Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Change Password</h3>
                <div className="grid grid-cols-1 gap-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button
                    onClick={() => handleSave("password")}
                    className="w-full"
                  >
                    Update Password
                  </Button>
                </div>
              </div>

              {/* Security Settings */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-semibold">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={userData.settings.twoFactorAuth}
                      onCheckedChange={(value) =>
                        setUserData((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, twoFactorAuth: value },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleSave("security settings")}
                className="w-full md:w-auto"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
