"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Account, User } from "@/types/types"

// ----- TYPES -----
export type RoleType = "ADMIN" | "USER"

interface AuthContextType {
  user: User | null
  userAccounts: Account[]
  accessToken: string | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const baseUrl = "https://l2p-cooperative-backend.onrender.com"

// ----- PROVIDER -----
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userAccounts, setUserAccounts] = useState<Account[]>([])
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Restore session & refresh user
  useEffect(() => {
    const restoreSession = async () => {
      setIsLoading(true)
      const savedToken = localStorage.getItem("accessToken")
      const savedUser = localStorage.getItem("user")

      if (savedToken && savedUser) {
        const parsedUser: User = JSON.parse(savedUser)
        try {
          // Fetch latest user info
          const res = await axios.get(`${baseUrl}/users/${parsedUser.id}`, {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          })

          const freshUser = res.data
          console.log(freshUser)
          setAccessToken(savedToken)
          setUser(freshUser)
          setUserAccounts(freshUser.accounts)

          // Update localStorage with fresh user
          localStorage.setItem("user", JSON.stringify(freshUser))
        } catch (err) {
          console.error("Failed to fetch user info:", err)
          // If token invalid, clear session
          logout()
        }
      }
      setIsLoading(false)
    }

    restoreSession()
  }, [])

  // ----- LOGIN -----
  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, { username, password })
      const { accessToken, user: userData } = res.data

      setAccessToken(accessToken)
      setUser(userData)
      setUserAccounts(userData.accounts)
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("user", JSON.stringify(userData))

      if (userData.roleType === "ADMIN") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("Login failed", err)
      throw err
    }
  }

  // ----- REGISTER -----
  const register = async (data: any) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/signup`, data)
      const { accessToken, user: userData } = res.data

      if (accessToken && userData) {
        setAccessToken(accessToken)
        setUser(userData)
        setUserAccounts(userData.accounts)
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("user", JSON.stringify(userData))

        if (userData.roleType === "ADMIN") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (err) {
      console.error("Signup failed", err)
      throw err
    }
  }

  // ----- LOGOUT -----
  const logout = () => {
    setUser(null)
    setAccessToken(null)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, userAccounts, accessToken, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ----- CUSTOM HOOK -----
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
