import { alertCircleOutline } from "ionicons/icons"
import { Flex } from "./Flex"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { PropsWithChildren } from "react"

export type NotificationProps = PropsWithChildren<{
  readonly type?: "danger"
}>

export function Notification({ children, type }: NotificationProps) {
  const bgColor = type === "danger" ? "ion-color-danger" : ""
  const color = type === "danger" ? "light" : ""
  const icon = type === "danger" ? alertCircleOutline : undefined
  return (
    <Flex
      additionalStyles={{
        backgroundColor: `var(--${bgColor})`,
        borderRadius: 12,
        paddingLeft: 16,
        paddingRight: 16,
      }}
      align="center"
      gap={16}
    >
      <Icon color={color} icon={icon} size="large" />
      <Text color={color}>
        {children}
      </Text>
    </Flex>
  )
}
