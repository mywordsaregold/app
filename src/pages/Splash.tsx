import { Button } from "@ui/Button"
import { Text } from "@ui/Text"
import { MyYourOur } from "../components/splash/MyYourOur"
import "./Splash.css"
import { AppPage } from "@ui/AppPage"
import { useAuth0 } from "@auth0/auth0-react"

export const Splash: React.FC = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <AppPage align="center" justify="center">
      <MyYourOur />
      <Text as="h1" color="primary">
        words
      </Text>
      <Text as="h1" color="primary">
        are
      </Text>
      <Text as="h1" color="primary">
        gold
      </Text>
      {/* <Button routerLink={ROUTER_PATHS.LOGIN}>Get Started</Button> */}
      <Button onClick={() => loginWithRedirect()}>Get Started</Button>
    </AppPage>
  )
}
