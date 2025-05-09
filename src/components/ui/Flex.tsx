import { FlexProps, flexStyle } from "./Flex.style"

export const Flex: React.FC<React.PropsWithChildren<FlexProps>> = ({
  children,
  ...props
}) => {
  return <div style={flexStyle(props)}>{children}</div>
}
