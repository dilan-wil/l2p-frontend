"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  Calculator,
  CreditCard,
  FileCheck,
  HelpCircle,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  Users,
} from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "@/lib/useTranslations"
import { useAuth } from "@/hooks/auth-context"

const AdminSidebar = () => {
  const pathname = usePathname()
  const t = useTranslations('sidebar')
  const navigation = [
    { name: t('admin.navigation.dashboard'), href: "/admin", icon: Home },
    { name: t('admin.navigation.kyc'), href: "/admin/kyc", icon: FileCheck },
    { name: t('admin.navigation.loan'), href: "/admin/loans", icon: CreditCard },
    { name: t('admin.navigation.reconciliation'), href: "/admin/reconciliation", icon: Calculator },
    { name: t('admin.navigation.reports'), href: "/admin/reports", icon: BarChart3 },
    { name: t('admin.navigation.users'), href: "/admin/users", icon: Users },
    { name: t('admin.navigation.notification'), href: "/admin/notifications", icon: MessageSquare },
  ]
  const { logout } = useAuth()
  
  return (
    <Sidebar collapsible="icon" className="border-r border-blue-100 bg-white/80 backdrop-blur-md">
      <SidebarContent>
        <SidebarHeader className="group-data-[collapsible=icon]:hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-gray-900">{t('admin.title')}</span>
                <p className="text-sm text-gray-500">{t('admin.subtitle')}</p>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-medium">{t('admin.sections.management')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      className={`w-full ${
                        isActive
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      <Link href={item.href}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        {item.name === "KYC Queue" && (
                          <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700">
                            3
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <div className="p-4 border-t border-sidebar-border space-y-1">
          {/* Settings */}
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              pathname === "/admin/settings"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            asChild
          >
            <Link href="/admin/settings">
              <Settings className="h-4 w-4 mr-3" />
              {t('admin.footer.settings')}
            </Link>
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              pathname === "/help"
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            asChild
          >
            <Link href="/help">
              <HelpCircle className="h-4 w-4 mr-3" />
              {t('admin.footer.help')}
            </Link>
          </Button>

          {/* Sign Out */}
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start text-red-600 hover:bg-red-50"
            asChild
          >
            <span className="flex items-center">
              <LogOut className="h-4 w-4 mr-3" />
              {t('admin.footer.sign_out')}
            </span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AdminSidebar
