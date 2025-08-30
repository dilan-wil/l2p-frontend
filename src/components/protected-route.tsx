import React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/auth-context"

type Props = {
  children: React.ReactNode
  allowedRoles?: ("ADMIN" | "USER")[]
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  if (!user && !isLoading) {
    // Not logged in
    router.push('/login')
    return 
  }

  if (user && allowedRoles && !allowedRoles.includes(user.roleType)) {
    // Logged in but role not allowed
    router.push('/unathorized')

    return
  }

  return <>{children}</>
}

export default ProtectedRoute
