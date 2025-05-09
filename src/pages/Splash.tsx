import { Button } from "@ui/Button"
import { Text } from "@ui/Text"
import { MyYourOur } from "../components/splash/MyYourOur"
import "./Splash.css"
import { AppPage } from "@ui/AppPage"
import { ROUTER_PATHS } from "../routes"

export const Splash: React.FC = () => {
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
      <Button routerLink={ROUTER_PATHS.LOGIN}>Get Started</Button>
    </AppPage>
  )
}
