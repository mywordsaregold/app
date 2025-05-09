import { createContext } from "react"


export type AuthContextValue = {
  accessToken?: string
  isAuthenticated: boolean
  isLoading: boolean
}

export function defaultAuthContext(): AuthContextValue {
  return {
    isAuthenticated: false,
    isLoading: true,
  }
}

export const AuthContext = createContext(defaultAuthContext())
