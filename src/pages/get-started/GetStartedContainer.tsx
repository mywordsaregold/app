import { Flex } from "@ui/Flex"

export const GetStartedContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Flex align="center" direction="column" justify="center">
      {children}
    </Flex>
  )
}
