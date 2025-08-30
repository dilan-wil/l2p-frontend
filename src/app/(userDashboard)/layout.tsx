"use client"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import UserDashboardNavbar from "@/components/user-navbar";
import ClientSidebar from "@/components/user-sidebar";
import ProtectedRoute from "@/components/protected-route";


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
        <ClientSidebar />
        <SidebarInset>
        <UserDashboardNavbar />
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-x-hidden">
            <ProtectedRoute allowedRoles={["USER"]}>
              {children}
            </ProtectedRoute>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
