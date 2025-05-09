import { useDebounce } from "@react-util/useDebounce"
import { Button } from "@ui/Button"
import { Input } from "@ui/Input"
import { Spinner } from "@ui/Spinner"
import { Text } from "@ui/Text"
import { FC, useState } from "react"
import { inviteSchema } from "../../schemas/invite"
import { useGetInvitesQuery } from "../../services/gateway-api"
import { GetStartedContainer } from "./GetStartedContainer"

const phraseSchema = inviteSchema.shape.phrase

function isPhraseValid(phrase: string) {
  return phraseSchema.safeParse(phrase).success
}

type RequestPhraseProps = {
  navigateInvite(phrase: string): void
}

export const RequestPhrase: FC<RequestPhraseProps> = ({ navigateInvite }) => {
  const [ phrase, setPhrase ] = useState("")
  const [ debouncedPhrase, setDebouncedPhrase ] = useState("")
  const { data: inviteMatches, isFetching } = useGetInvitesQuery(
    { phrase: debouncedPhrase.toUpperCase() },
    { skip: !isPhraseValid(debouncedPhrase) },
  )
  const debounce = useDebounce((phrase: string) => {
    setDebouncedPhrase(phrase)
  }, 500)
  const handlePhraseChange = (phrase: string) => {
    setPhrase(phrase)
    debounce(phrase)
  }
  const submitPhrase = () => {
    if (phraseSchema.safeParse(phrase).success) {
      navigateInvite(phrase)
    }
  }
  const inviteFound = inviteMatches?.length === 1 && inviteMatches[0].phrase === phrase
  const inviteNotFound = phrase === debouncedPhrase && isPhraseValid(phrase) && !isFetching && !inviteFound
  return (
    <GetStartedContainer>
      <Text as="h1" align="center">
        GOLD chat is an invite-only space
      </Text>
      <Text as="p" align="center">
        To enter the app you must have been invited by someone already on the
        app.
        <br />
        Such a person would have given you their invite phrase.
      </Text>
      <Input
        label="Enter an invite phrase"
        schema={phraseSchema}
        value={phrase}
        onChange={handlePhraseChange}
      />
      {isFetching && <Spinner />}
      {inviteFound && <Button onClick={submitPhrase}>Accept their invitation</Button>}
      {inviteNotFound && <Text as="p" align='center'>
        Couldn't find an invite with that phrase
      </Text>}
    </GetStartedContainer>
  )
}
