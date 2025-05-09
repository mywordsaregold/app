import { useAuth0 } from "@auth0/auth0-react"
import { Spinner } from "@ui/Spinner"
import { FC, PropsWithChildren, useState, useEffect } from "react"
import { defaultAuthContext, AuthContext } from "../contexts/AuthContext"


export const AuthContextComponent: FC<PropsWithChildren> = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0()
  const [ authContextValue, setAuthContextValue ] = useState(defaultAuthContext)

  useEffect(() => {
    let skip = false
    const updateAuthContext = async () => {
      const isAuthenticationComplete = !isLoading && isAuthenticated
      const token = isAuthenticationComplete ? await getAccessTokenSilently() : undefined
      if (!skip) {
        setAuthContextValue({
          accessToken: token,
          isAuthenticated: isAuthenticationComplete,
          isLoading,
        })
      }
    }
    updateAuthContext().catch(e => console.error(e))
    return () => {
      skip = true
    }
  }, [ getAccessTokenSilently, isAuthenticated, isLoading ])

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
      {isLoading && <Spinner />}
    </AuthContext.Provider>
  )
}