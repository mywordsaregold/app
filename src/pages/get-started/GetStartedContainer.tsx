import { Flex } from '@ui/Flex'

export const GetStartedContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Flex direction="column" align="center" justify="center">
      {children}
    </Flex>
  )
}
