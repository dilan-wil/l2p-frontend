"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin-sidebar";
import AdminDashboardNavbar from "@/components/admin-navbar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Bell, Globe, Link, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";


export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname()
    const basePath = `/${pathname.split('/')[1]}`

  function changeLanguage(locale: string) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    window.location.reload(); // Force reload so `request.ts` picks up the new cookie
  }

  return (
    <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
        <AdminDashboardNavbar />
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-x-hidden">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
