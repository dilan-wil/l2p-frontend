"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { User } from "@/types/types"

// ----- TYPES -----
export type RoleType = "ADMIN" | "USER"

interface AuthContextType {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ----- PROVIDER -----
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Restore session from localStorage
  useEffect(() => {
    setIsLoading(true)
    const savedToken = localStorage.getItem("accessToken")
    const savedUser = localStorage.getItem("user")
    console.log({savedToken, savedUser: savedUser ? JSON.parse(savedUser) : null})
    if (savedToken && savedUser) {
      setAccessToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)

  }, [])

  // ----- LOGIN -----
  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post("https://l2p-cooperative-backend.onrender.com/auth/login", { username, password })
      const { accessToken, user: userData } = res.data
      console.log(userData)
      setAccessToken(accessToken)
      setUser(userData)
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("user", JSON.stringify(userData))
      if (userData.roleType === "ADMIN"){
        router.push("/admin") // redirect after login
      } else if (userData.roleType === "USER"){
        router.push("/dashboard") // redirect after login
      }
    } catch (err) {
      console.error("Login failed", err)
      throw err
    }
  }

  const register = async (data: any) => {
    try {
      const res = await axios.post(
        "https://l2p-cooperative-backend.onrender.com/auth/signup",
        { ...data, password: data.password }
      )

      // Option B: auto-login after signup (using same pattern as login)
      const { accessToken, user: userData } = res.data
      if (accessToken && userData) {
        setAccessToken(accessToken)
        setUser(userData)
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
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, register, logout }}>
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
