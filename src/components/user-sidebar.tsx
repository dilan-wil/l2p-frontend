"use client";

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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Bell,
  Calculator,
  CreditCard,
  EllipsisVertical,
  FileCheck,
  HelpCircle,
  History,
  Home,
  LogOut,
  LogOutIcon,
  MessageSquare,
  PiggyBank,
  Settings,
  Shield,
  User,
  UserCircle,
  Users,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTranslations } from "@/lib/useTranslations";
import { useAuth } from "@/hooks/auth-context";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const ClientSidebar = () => {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const t = useTranslations("sidebar");
  const navigation = [
    { name: t("client.navigation.dashboard"), href: "/dashboard", icon: Home },
    {
      name: t("client.navigation.account"),
      href: "/dashboard/accounts",
      icon: Home,
    },
    // { name: t('client.navigation.savings'), href: "/dashboard/savings", icon: PiggyBank },
    // { name: t('client.navigation.loans'), href: "/dashboard/loans", icon: CreditCard },
    {
      name: t("client.navigation.transactions"),
      href: "/dashboard/transactions",
      icon: History,
    },
    {
      name: t("client.navigation.profile"),
      href: "/dashboard/profile",
      icon: User,
    },
  ];
  const { logout, user } = useAuth();

  // const user= {
  //     name: "shadcn",
  //     email: "m@example.com",
  //     avatar: "/avatars/shadcn.jpg",
  // }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-blue-100 bg-white/80 backdrop-blur-md"
    >
      <SidebarContent>
        <SidebarHeader className="group-data-[collapsible=icon]:hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-gray-900">
                  {t("client.title")}
                </span>
                <p className="text-sm text-gray-500">{t("client.subtitle")}</p>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-medium">
            {t("client.sections.user_dashboard")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      className={`w-full ${
                        isActive
                          ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      <Link href={item.href}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        {item.name === "KYC Queue" && (
                          <Badge
                            variant="secondary"
                            className="ml-auto bg-blue-100 text-blue-700"
                          >
                            3
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
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
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4 mr-3" />
              {t("client.footer.settings")}
            </Link>
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              pathname === "/dashboard/help"
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            asChild
          >
            <Link href="/dashboard/help">
              <HelpCircle className="h-4 w-4 mr-3" />
              {t("client.footer.help")}
            </Link>
          </Button>

          {/* Sign Out */}
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50"
            asChild
          >
            <Link href="/login">
              <LogOut className="h-4 w-4 mr-3" />
              {t("client.footer.sign_out")}
            </Link>
          </Button>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage
                      src="/avatars/shadcn.jpg"
                      alt={user?.profile.firstName}
                    />
                    <AvatarFallback className="rounded-lg">
                      {getInitials(user?.profile.firstName ?? "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.profile.firstName} {user?.profile.lastName}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user?.email}
                    </span>
                  </div>
                  <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src="/avatars/shadcn.jpg"
                        alt={user?.profile.firstName}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user?.profile.firstName} {user?.profile.lastName}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserCircle />
                    {t("client.footer.dropdown.account")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    {t("client.footer.dropdown.notifications")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOutIcon />
                  {t("client.footer.dropdown.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ClientSidebar;
