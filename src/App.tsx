import "./ionic-imports"
import { IonApp, IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { GetStarted } from "./pages/get-started/GetStarted"
import { store } from "./stores/global-store"
import { Provider } from "react-redux"
import { ROUTER_PATHS } from "./routes"
import { AUTH0_API_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "./environment/variables"
import { Auth0Provider } from "@auth0/auth0-react"
import { AuthContextComponent } from "./components/AuthContextComponent"

const App: React.FC = () => {
  return (
    <IonApp>
      <Provider store={store}>
        <Auth0Provider
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: AUTH0_API_AUDIENCE,
          }}
          clientId={AUTH0_CLIENT_ID}
          domain={AUTH0_DOMAIN}
        >
          <AuthContextComponent>
            <IonReactRouter>
              <IonRouterOutlet>
                <Route component={GetStarted} exact path={ROUTER_PATHS.LOGIN} />
                <Route exact path="/">
                  <Home />
                </Route>
              </IonRouterOutlet>
            </IonReactRouter>
          </AuthContextComponent>
        </Auth0Provider>
      </Provider>
    </IonApp>
  )
}

export default App
