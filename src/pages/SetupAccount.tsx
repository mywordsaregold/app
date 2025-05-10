import { AppPage } from "@ui/AppPage"
import { Flex } from "@ui/Flex"
import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useCreateUserMutation, useGetInvitesQuery } from "../services/gateway-api"
import { Input } from "@ui/Input"
import { Text } from "@ui/Text"
import { userSchema } from "../schemas/user"
import { Button } from "@ui/Button"
import { Spinner } from "@ui/Spinner"
import { inviteSchema } from "../schemas/invite"
import { useDebounce } from "@react-util/useDebounce"
import { Notification } from "@ui/Notification"
import { isApiError } from "../schemas/util"
import { useAuth0 } from "@auth0/auth0-react"

export function SetupAccount() {
  const { logout } = useAuth0()
  const { accessToken } = useContext(AuthContext)
  const [ phrase, setPhrase ] = useState("")
  const [ nickname, setNickname ] = useState("")
  const [ debouncedPhrase, setDebouncedPhrase ] = useState("")
  const [ triggerCreateUser, { error, isLoading: isCreating }] = useCreateUserMutation()
  const { data: inviteMatches = [], isFetching } = useGetInvitesQuery(
    { phrase: debouncedPhrase.toUpperCase() },
    { skip: !inviteSchema.shape.phrase.safeParse(debouncedPhrase).success },
  )

  const invite = inviteMatches.length ? inviteMatches[0] : undefined
  const formIsValid =
    accessToken &&
    inviteSchema.shape.phrase.safeParse(debouncedPhrase).success &&
    userSchema.shape.nickname.safeParse(nickname).success &&
    invite

  const debounce = useDebounce((phrase: string) => {
    setDebouncedPhrase(phrase)
  }, 500)
  const createUser = async () => {
    if (!(accessToken && invite)) {
      return
    }
    await triggerCreateUser({
      accessToken,
      body: { inviteId: invite.id, nickname },
    })
  }

  // if (!user) {
  //   return <Redirect to={ROUTER_PATHS.LOGIN} />
  // }

  return (
    <AppPage align="center" justify="center">
      <Flex align="center" direction="column" gap={8} justify="center">
        <Text align="center" as="h1">
          GOLD chat is an invite-only space
        </Text>
        <div>
          <Text align="center" as="p" />
          To enter the app you must have been invited by someone already on the app.
          <Text align="center" as="p">
            Such a person would have given you their invite phrase.
          </Text>
        </div>
        <Text as="p">You need to provide a nickname for yourself.</Text>
        <Input
          label="Sorry, please re-enter the invite phrase"
          onChange={phrase => {
            setPhrase(phrase)
            debounce(phrase)
          }}
          schema={inviteSchema.shape.phrase}
          value={phrase}
        />
        <Input
          label="Enter your nickname"
          onChange={nickname => setNickname(nickname)}
          schema={userSchema.shape.nickname}
          value={nickname}
        />
        {isFetching ? (
          <Flex gap={8}>
            <Spinner />
            Verifying...
          </Flex>
        ) : null}
        {invite?.isFull && phrase === invite.phrase ? (
          <Notification type="danger">Unfortunately, you cannot use that invite anymore.</Notification>
        ) : null}
        {error ? (
          <Notification type="danger">{(isApiError(error) && error.message) || "Something went wrong"}</Notification>
        ) : null}
        <Button disabled={!formIsValid || isCreating} onClick={createUser}>
          {isCreating ? <Spinner /> : null}
          Create your account
        </Button>
        <br />
        <br />
        <br />
        <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</Button>
      </Flex>
    </AppPage>
  )
}
