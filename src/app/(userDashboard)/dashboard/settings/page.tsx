"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Lock,
  Bell,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Save,
  Trash2,
  AlertTriangle,
} from "lucide-react"

// Mock settings data
const initialSettings = {
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    transactionAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
  },
  security: {
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30",
  },
  preferences: {
    theme: "system",
    language: "en",
    currency: "USD",
    timezone: "America/New_York",
  },
  privacy: {
    profileVisibility: "private",
    dataSharing: false,
    analyticsOptOut: false,
  },
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)

    // toast({
    //   title: "Settings Updated",
    //   description: "Your preferences have been successfully saved.",
    // })
  }

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // toast({
      //   title: "Password Mismatch",
      //   description: "New password and confirmation do not match.",
      //   variant: "destructive",
      // })
      return
    }

    if (passwordData.newPassword.length < 8) {
      // toast({
      //   title: "Password Too Short",
      //   description: "Password must be at least 8 characters long.",
      //   variant: "destructive",
      // })
      return
    }

    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    // toast({
    //   title: "Password Updated",
    //   description: "Your password has been successfully changed.",
    // })
  }

  const handleAccountDeactivation = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // toast({
    //   title: "Account Deactivated",
    //   description: "Your account has been deactivated. You can reactivate it by logging in again.",
    //   variant: "destructive",
    // })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and security settings</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Password Change */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Label className="text-base font-semibold">Change Password</Label>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                    >
                      {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                    >
                      {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button onClick={handlePasswordUpdate} className="w-full">
                  Update Password
                </Button>
              </div>
            </div>

            <Separator />

            {/* Two-Factor Authentication */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center gap-2">
                  {settings.security.twoFactorEnabled && <Badge variant="secondary">Enabled</Badge>}
                  <Switch
                    checked={settings.security.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSettingChange("security", "twoFactorEnabled", checked)}
                  />
                </div>
              </div>
            </div>

            {/* Login Alerts */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold">Login Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
              </div>
              <Switch
                checked={settings.security.loginAlerts}
                onCheckedChange={(checked) => handleSettingChange("security", "loginAlerts", checked)}
              />
            </div>

            {/* Session Timeout */}
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Select
                value={settings.security.sessionTimeout}
                onValueChange={(value) => handleSettingChange("security", "sessionTimeout", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Choose how you want to be notified about account activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "smsNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "pushNotifications", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Transaction Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about account transactions</p>
                </div>
                <Switch
                  checked={settings.notifications.transactionAlerts}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "transactionAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Important security notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.securityAlerts}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "securityAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Promotional content and updates</p>
                </div>
                <Switch
                  checked={settings.notifications.marketingEmails}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "marketingEmails", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your app experience and display settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.preferences.theme}
                onValueChange={(value) => handleSettingChange("preferences", "theme", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.preferences.language}
                onValueChange={(value) => handleSettingChange("preferences", "language", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={settings.preferences.currency}
                onValueChange={(value) => handleSettingChange("preferences", "currency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={settings.preferences.timezone}
                onValueChange={(value) => handleSettingChange("preferences", "timezone", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Privacy
            </CardTitle>
            <CardDescription>Control your privacy and data sharing preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileVisibility">Profile Visibility</Label>
              <Select
                value={settings.privacy.profileVisibility}
                onValueChange={(value) => handleSettingChange("privacy", "profileVisibility", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold">Data Sharing</Label>
                <p className="text-sm text-muted-foreground">Allow sharing anonymized data for service improvement</p>
              </div>
              <Switch
                checked={settings.privacy.dataSharing}
                onCheckedChange={(checked) => handleSettingChange("privacy", "dataSharing", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold">Analytics Opt-out</Label>
                <p className="text-sm text-muted-foreground">Opt out of usage analytics and tracking</p>
              </div>
              <Switch
                checked={settings.privacy.analyticsOptOut}
                onCheckedChange={(checked) => handleSettingChange("privacy", "analyticsOptOut", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Deactivate Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will deactivate your account. You can reactivate it by logging in again, but some data may
                  be temporarily inaccessible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleAccountDeactivation}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Deactivate Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
