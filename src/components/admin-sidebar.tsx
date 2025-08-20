import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Shield, Users } from "lucide-react"
import { Badge } from "./ui/badge"

const AdminSidebar = () => {

    return (
        <Sidebar className="border-r border-blue-100 bg-white/80 backdrop-blur-md">
            <SidebarContent>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-lg text-gray-900">L2P Admin</span>
                            <p className="text-sm text-gray-500">Management Portal</p>
                        </div>
                    </div>
                </div>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-600 font-medium">Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100">
                                    <Users className="w-4 h-4" />
                                    <span>KYC Management</span>
                                    <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700">
                                        3
                                    </Badge>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AdminSidebar