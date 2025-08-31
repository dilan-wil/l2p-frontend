"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Account, User } from "@/types/types"

// ----- TYPES -----
export type RoleType = "ADMIN" | "USER"

const sortAccounts = (accounts: Account[]) => {
  return accounts.sort((a, b) => {
    if (a.rib && !b.rib) return -1  // a has RIB, b doesn't → a goes first
    if (!a.rib && b.rib) return 1   // a doesn't have RIB, b does → b goes first
    return 0                        // otherwise keep order
  })
}

interface AuthContextType {
  user: User | null
  userAccounts: Account[]
  accessToken: string | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  openAccount: (type: string, agencyId: string) => Promise<void>
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
          setUserAccounts(sortAccounts(freshUser.accounts))

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
      setUserAccounts(sortAccounts(userData.accounts))
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
        setUserAccounts(sortAccounts(userData.accounts))
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

  const fetchAccounts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/accounts/me?page=1&limit=10`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      // Make sure accounts exist
      const accounts = res.data?.accounts || []

      setUserAccounts(sortAccounts(accounts))
    } catch (err) {
      console.error("Failed to fetch accounts", err)
    }
  }

  const openAccount = async (type: string, agencyId: string) => {
    try {
      const res = await axios.post(
        `${baseUrl}/accounts/open?bankId=10221&agencyId=${agencyId}&type=${type}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      console.log("Account opened", res.data)
      // refresh accounts after opening
      fetchAccounts()
    } catch (err) {
      console.error("Failed to open account", err)
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
    <AuthContext.Provider value={{ user, userAccounts, accessToken, isLoading, login, register, logout, openAccount }}>
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


