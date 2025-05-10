// import { useTimer } from '@react-util/useTimer'
import { Text } from "@ui/Text"
import { useState } from "react"

const words = [ "My", "Your", "Our" ]

export const MyYourOur = () => {
  const [ index ] = useState(0)
  // useTimer(() => setIndex(i => (i + 1) % words.length), 1500)
  return (
    <Text as="h1" color="primary">
      {words[index]}
    </Text>
  )
}
