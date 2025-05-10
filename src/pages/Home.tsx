import { useAuth0 } from "@auth0/auth0-react"
import { AppPage } from "@ui/AppPage"
import { Splash } from "./Splash"
import { Flex } from "@ui/Flex"
import { Button } from "@ui/Button"
import { useGetMyUserQuery } from "../services/gateway-api"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Spinner } from "@ui/Spinner"
import { Icon } from "@ui/Icon"
import { alertCircleOutline } from "ionicons/icons"
import { SetupAccount } from "./SetupAccount"

export function Home() {
  const { logout } = useAuth0()
  const { accessToken, isAuthenticated, isLoading: isLoadingAuth } = useContext(AuthContext)
  const { data = [], error, isLoading: isLoadingUser } = useGetMyUserQuery(
    { accessToken: accessToken ?? "" },
    { skip: !accessToken },
  )

  if (isLoadingAuth || isLoadingUser || error) {
    if (error) {
      console.error(error)
    }
    return (
      <AppPage align="center" justify="center">
        {!error && <Spinner />}
        {!!error && <Icon icon={alertCircleOutline} size="large" />}
        {!!error && <span>Something went wrong, please reload the page.</span>}
      </AppPage>
    )
  }

  if (!isAuthenticated) {
    return <Splash />
  }

  if (data.length === 0) {
    return <SetupAccount />
  }

  return (
    <AppPage align="center" justify="center">
      <Flex align="center" direction="column" justify="center">
        <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</Button>
      </Flex>
    </AppPage>
  )
}
