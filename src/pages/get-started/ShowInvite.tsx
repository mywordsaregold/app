import { Button } from "@ui/Button"
import { Text } from "@ui/Text"
import { useGetInvitesQuery } from "../../services/gateway-api"
import { GetStartedContainer } from "./GetStartedContainer"
import { FC } from "react"
import { useAuth0 } from "@auth0/auth0-react"

export type ShowInviteProps = {
  readonly phrase: string
  navigateInvite(phrase: string): void
}

export const ShowInvite: FC<ShowInviteProps> = ({ navigateInvite, phrase }) => {
  const { loginWithRedirect } = useAuth0()
  const { data: invites, error } = useGetInvitesQuery({ phrase })
  if (!invites?.length || !invites[0].creator) {
    return (
      <>
        Error {error}
        <Button onClick={() => navigateInvite("")}>Go back</Button>
      </>
    )
  }
  let nickname = invites[0].creator.nickname
  nickname += nickname.endsWith("s") ? "'" : "'s"
  return (
    <GetStartedContainer>
      <Text as="h1">{nickname} words are gold.</Text>
      <Text align="center" as="p">
        And they think yours should be too.
        <br />
        Speak freely and stay on topic.
        <br />
        It all quiets down once you're out of bounds.
      </Text>
      <Text align='center' as="p">Join them and see what it's like to be in the circle.</Text>
      <Button onClick={() => loginWithRedirect()}>Accept their invitation</Button>
    </GetStartedContainer>
  )
}
