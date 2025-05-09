import { alertCircleOutline } from "ionicons/icons"
import { Flex } from "./Flex"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { PropsWithChildren } from "react"

export type NotificationProps = PropsWithChildren<{
  type?: "danger"
}>

export function Notification({ children, type }: NotificationProps) {
  const bgColor = type === "danger" ? "ion-color-danger" : ""
  const color = type === "danger" ? "light" : ""
  const icon = type === "danger" ? alertCircleOutline : undefined
  return (
    <Flex align="center" gap={16} additionalStyles={{
      backgroundColor: `var(--${bgColor})`,
      borderRadius: 12,
      paddingLeft: 16,
      paddingRight: 16,
    }}>
      <Icon icon={icon} size="large" color={color} />
      <Text color={color}>
        {children}
      </Text>
    </Flex>
  )
}
