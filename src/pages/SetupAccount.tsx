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

export function SetupAccount() {
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
      <Flex direction="column" align="center" justify="center" gap={8}>
        <Text as="h1">Setup your account</Text>
        <Text as="p">You need to provide a nickname for yourself.</Text>
        <Input
          label="Sorry, please re-enter the invite phrase"
          schema={inviteSchema.shape.phrase}
          value={phrase}
          onChange={phrase => {
            setPhrase(phrase)
            debounce(phrase)
          }}
        />
        <Input
          label="Enter your nickname"
          schema={userSchema.shape.nickname}
          value={nickname}
          onChange={nickname => setNickname(nickname)}
        />
        {isFetching && (
          <Flex gap={8}>
            <Spinner />
            Verifying...
          </Flex>
        )}
        {invite?.isFull && phrase === invite.phrase && (
          <Notification type="danger">Unfortunately, you cannot use that invite anymore.</Notification>
        )}
        {error && (
          <Notification type="danger">{(isApiError(error) && error.message) || "Something went wrong"}</Notification>
        )}
        <Button disabled={!formIsValid || isCreating} onClick={createUser}>
          {isCreating && <Spinner />}
          Create your account
        </Button>
      </Flex>
    </AppPage>
  )
}
