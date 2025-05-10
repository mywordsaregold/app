import { IonPage, IonContent } from "@ionic/react"
import { FC } from "react"
import { Flex } from "./Flex"
import { FlexContainerProps, FlexContainer } from "./FlexContainer"

export type AppPageProps = FlexContainerProps<typeof IonContent>

export const AppPage: FC<AppPageProps> = ({ children, ...props }) => {
  return (
    <IonPage>
      <FlexContainer as={IonContent} fullscreen>
        <Flex
          styleOverride={{
            display: "flex",
            flexGrow: 1,
            height: "100%",
            padding: "5%",
            flexDirection: "column",
          }}
          {...props}
        >
          {children}
        </Flex>
      </FlexContainer>
    </IonPage>
  )
}
