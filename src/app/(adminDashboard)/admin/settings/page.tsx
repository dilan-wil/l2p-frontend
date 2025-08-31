"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
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
  Shield,
  Settings,
  DollarSign,
  Bell,
  Lock,
  Globe,
  AlertTriangle,
  Save,
  RefreshCw,
  Download,
  Upload,
} from "lucide-react"

// Mock admin settings data
const initialSettings = {
  platform: {
    siteName: "Financial Dashboard",
    siteDescription: "Comprehensive financial management platform",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    maxUsersPerAccount: 5,
  },
  security: {
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorRequired: false,
    ipWhitelistEnabled: false,
    auditLoggingEnabled: true,
  },
  financial: {
    defaultCurrency: "USD",
    transactionLimits: {
      dailyLimit: 10000,
      monthlyLimit: 50000,
      singleTransactionLimit: 5000,
    },
    feeStructure: {
      transactionFee: 0.5,
      monthlyFee: 9.99,
      overdraftFee: 35.0,
    },
    interestRates: {
      savingsRate: 4.5,
      checkingRate: 0.1,
      creditCardRate: 18.99,
    },
  },
  notifications: {
    emailNotificationsEnabled: true,
    smsNotificationsEnabled: true,
    pushNotificationsEnabled: true,
    systemAlertsEnabled: true,
    maintenanceNotifications: true,
    securityAlerts: true,
  },
  integrations: {
    apiRateLimit: 1000,
    webhooksEnabled: true,
    thirdPartyIntegrationsEnabled: true,
    dataExportEnabled: true,
    backupFrequency: "daily",
  },
  compliance: {
    gdprCompliance: true,
    ccpaCompliance: true,
    dataRetentionPeriod: 7,
    auditTrailEnabled: true,
    encryptionEnabled: true,
  },
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("platform")
  const { toast } = useToast()

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  const handleNestedSettingChange = (category: string, subcategory: string, setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: {
          ...(prev[category as keyof typeof prev] as any)[subcategory],
          [setting]: value,
        },
      },
    }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSaving(false)

    toast({
      title: "Settings Updated",
      description: "Platform settings have been successfully saved.",
    })
  }

  const handleSystemBackup = async () => {
    toast({
      title: "Backup Started",
      description: "System backup has been initiated. You'll be notified when complete.",
    })
  }

  const handleSystemMaintenance = async () => {
    toast({
      title: "Maintenance Mode Enabled",
      description: "The platform is now in maintenance mode. Users will see a maintenance page.",
      variant: "destructive",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-muted-foreground">Manage platform-wide configurations and system settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSystemBackup}>
            <Download className="h-4 w-4 mr-2" />
            Backup System
          </Button>
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Platform
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Compliance
          </TabsTrigger>
        </TabsList>

        {/* Platform Settings */}
        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Platform Configuration
              </CardTitle>
              <CardDescription>Basic platform settings and configurations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.platform.siteName}
                    onChange={(e) => handleSettingChange("platform", "siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxUsers">Max Users Per Account</Label>
                  <Input
                    id="maxUsers"
                    type="number"
                    value={settings.platform.maxUsersPerAccount}
                    onChange={(e) =>
                      handleSettingChange("platform", "maxUsersPerAccount", Number.parseInt(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.platform.siteDescription}
                  onChange={(e) => handleSettingChange("platform", "siteDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable to show maintenance page to all users</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {settings.platform.maintenanceMode && <Badge variant="destructive">Active</Badge>}
                    <Switch
                      checked={settings.platform.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange("platform", "maintenanceMode", checked)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">User Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                  </div>
                  <Switch
                    checked={settings.platform.registrationEnabled}
                    onCheckedChange={(checked) => handleSettingChange("platform", "registrationEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Email Verification Required</Label>
                    <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                  </div>
                  <Switch
                    checked={settings.platform.emailVerificationRequired}
                    onCheckedChange={(checked) => handleSettingChange("platform", "emailVerificationRequired", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>Platform security and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) =>
                      handleSettingChange("security", "passwordMinLength", Number.parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange("security", "sessionTimeout", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) =>
                      handleSettingChange("security", "maxLoginAttempts", Number.parseInt(e.target.value))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Require Special Characters</Label>
                    <p className="text-sm text-muted-foreground">Passwords must contain special characters</p>
                  </div>
                  <Switch
                    checked={settings.security.passwordRequireSpecialChars}
                    onCheckedChange={(checked) =>
                      handleSettingChange("security", "passwordRequireSpecialChars", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Require Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Force all users to enable 2FA</p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorRequired}
                    onCheckedChange={(checked) => handleSettingChange("security", "twoFactorRequired", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">IP Whitelist</Label>
                    <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                  </div>
                  <Switch
                    checked={settings.security.ipWhitelistEnabled}
                    onCheckedChange={(checked) => handleSettingChange("security", "ipWhitelistEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all user actions and system events</p>
                  </div>
                  <Switch
                    checked={settings.security.auditLoggingEnabled}
                    onCheckedChange={(checked) => handleSettingChange("security", "auditLoggingEnabled", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Settings */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Transaction Limits
                </CardTitle>
                <CardDescription>Set platform-wide transaction limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dailyLimit">Daily Transaction Limit</Label>
                  <Input
                    id="dailyLimit"
                    type="number"
                    value={settings.financial.transactionLimits.dailyLimit}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "financial",
                        "transactionLimits",
                        "dailyLimit",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyLimit">Monthly Transaction Limit</Label>
                  <Input
                    id="monthlyLimit"
                    type="number"
                    value={settings.financial.transactionLimits.monthlyLimit}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "financial",
                        "transactionLimits",
                        "monthlyLimit",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="singleLimit">Single Transaction Limit</Label>
                  <Input
                    id="singleLimit"
                    type="number"
                    value={settings.financial.transactionLimits.singleTransactionLimit}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "financial",
                        "transactionLimits",
                        "singleTransactionLimit",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Structure</CardTitle>
                <CardDescription>Configure platform fees and charges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transactionFee">Transaction Fee (%)</Label>
                  <Input
                    id="transactionFee"
                    type="number"
                    step="0.01"
                    value={settings.financial.feeStructure.transactionFee}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "financial",
                        "feeStructure",
                        "transactionFee",
                        Number.parseFloat(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyFee">Monthly Fee ($)</Label>
                  <Input
                    id="monthlyFee"
                    type="number"
                    step="0.01"
                    value={settings.financial.feeStructure.monthlyFee}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "financial",
                        "feeStructure",
                        "monthlyFee",
                        Number.parseFloat(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overdraftFee">Overdraft Fee ($)</Label>
                  <Input
                    id="overdraftFee"
                    type="number"
                    step="0.01"
                    value={settings.financial.feeStructure.overdraftFee}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "financial",
                        "feeStructure",
                        "overdraftFee",
                        Number.parseFloat(e.target.value),
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interest Rates</CardTitle>
                <CardDescription>Set interest rates for different account types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="savingsRate">Savings Account Rate (%)</Label>
                  <Input
                    id="savingsRate"
                    type="number"
                    step="0.01"
                    value={settings.financial.interestRates.savingsRate}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "financial",
                        "interestRates",
                        "savingsRate",
                        Number.parseFloat(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkingRate">Checking Account Rate (%)</Label>
                  <Input
                    id="checkingRate"
                    type="number"
                    step="0.01"
                    value={settings.financial.interestRates.checkingRate}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "financial",
                        "interestRates",
                        "checkingRate",
                        Number.parseFloat(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditCardRate">Credit Card APR (%)</Label>
                  <Input
                    id="creditCardRate"
                    type="number"
                    step="0.01"
                    value={settings.financial.interestRates.creditCardRate}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "financial",
                        "interestRates",
                        "creditCardRate",
                        Number.parseFloat(e.target.value),
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Currency Settings</CardTitle>
                <CardDescription>Default currency and regional settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultCurrency">Default Currency</Label>
                  <Select
                    value={settings.financial.defaultCurrency}
                    onValueChange={(value) => handleSettingChange("financial", "defaultCurrency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Configuration
              </CardTitle>
              <CardDescription>Manage platform-wide notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable email notification system</p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotificationsEnabled}
                  onCheckedChange={(checked) =>
                    handleSettingChange("notifications", "emailNotificationsEnabled", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable SMS notification system</p>
                </div>
                <Switch
                  checked={settings.notifications.smsNotificationsEnabled}
                  onCheckedChange={(checked) =>
                    handleSettingChange("notifications", "smsNotificationsEnabled", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable browser push notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.pushNotificationsEnabled}
                  onCheckedChange={(checked) =>
                    handleSettingChange("notifications", "pushNotificationsEnabled", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">Critical system notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.systemAlertsEnabled}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "systemAlertsEnabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Maintenance Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify users about scheduled maintenance</p>
                </div>
                <Switch
                  checked={settings.notifications.maintenanceNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingChange("notifications", "maintenanceNotifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Security-related notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.securityAlerts}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "securityAlerts", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                API & Integrations
              </CardTitle>
              <CardDescription>Configure external integrations and API settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
                  <Input
                    id="apiRateLimit"
                    type="number"
                    value={settings.integrations.apiRateLimit}
                    onChange={(e) =>
                      handleSettingChange("integrations", "apiRateLimit", Number.parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.integrations.backupFrequency}
                    onValueChange={(value) => handleSettingChange("integrations", "backupFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Webhooks</Label>
                    <p className="text-sm text-muted-foreground">Enable webhook functionality</p>
                  </div>
                  <Switch
                    checked={settings.integrations.webhooksEnabled}
                    onCheckedChange={(checked) => handleSettingChange("integrations", "webhooksEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Third-Party Integrations</Label>
                    <p className="text-sm text-muted-foreground">Allow external service integrations</p>
                  </div>
                  <Switch
                    checked={settings.integrations.thirdPartyIntegrationsEnabled}
                    onCheckedChange={(checked) =>
                      handleSettingChange("integrations", "thirdPartyIntegrationsEnabled", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Data Export</Label>
                    <p className="text-sm text-muted-foreground">Allow users to export their data</p>
                  </div>
                  <Switch
                    checked={settings.integrations.dataExportEnabled}
                    onCheckedChange={(checked) => handleSettingChange("integrations", "dataExportEnabled", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Settings */}
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Compliance & Privacy
              </CardTitle>
              <CardDescription>Data protection and regulatory compliance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention Period (years)</Label>
                <Input
                  id="dataRetention"
                  type="number"
                  value={settings.compliance.dataRetentionPeriod}
                  onChange={(e) =>
                    handleSettingChange("compliance", "dataRetentionPeriod", Number.parseInt(e.target.value))
                  }
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">GDPR Compliance</Label>
                    <p className="text-sm text-muted-foreground">European data protection regulation compliance</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Required</Badge>
                    <Switch
                      checked={settings.compliance.gdprCompliance}
                      onCheckedChange={(checked) => handleSettingChange("compliance", "gdprCompliance", checked)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">CCPA Compliance</Label>
                    <p className="text-sm text-muted-foreground">California consumer privacy act compliance</p>
                  </div>
                  <Switch
                    checked={settings.compliance.ccpaCompliance}
                    onCheckedChange={(checked) => handleSettingChange("compliance", "ccpaCompliance", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Audit Trail</Label>
                    <p className="text-sm text-muted-foreground">Maintain detailed audit logs</p>
                  </div>
                  <Switch
                    checked={settings.compliance.auditTrailEnabled}
                    onCheckedChange={(checked) => handleSettingChange("compliance", "auditTrailEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest and in transit</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Required</Badge>
                    <Switch
                      checked={settings.compliance.encryptionEnabled}
                      onCheckedChange={(checked) => handleSettingChange("compliance", "encryptionEnabled", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Actions */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            System Actions
          </CardTitle>
          <CardDescription>Critical system operations and maintenance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restart System
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Restart System</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will restart all system services. Users may experience a brief interruption. Continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Restart</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Enable Maintenance Mode
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Enable Maintenance Mode</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will show a maintenance page to all users and disable most functionality. Continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSystemMaintenance} className="bg-destructive">
                    Enable Maintenance
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Configuration
            </Button>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
