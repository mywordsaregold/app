import { AppPage } from "@ui/AppPage"
import { useState } from "react"
import { RequestPhrase } from "./RequestPhrase"
import { ShowInvite } from "./ShowInvite"

export const GetStarted: React.FC = () => {
  const [ phrase, navigateInvite ] = useState("")
  return (
    <AppPage align="center" justify="center">
      {!phrase && <RequestPhrase navigateInvite={navigateInvite} />}
      {phrase && <ShowInvite navigateInvite={navigateInvite} phrase={phrase} />}
    </AppPage>
  )
}
