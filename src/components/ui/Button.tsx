import { IonButton } from "@ionic/react"
import { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react"
import { Flex } from "./Flex"

export type ButtonProps = PropsWithChildren<
  ComponentPropsWithoutRef<typeof IonButton>
>

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (<IonButton {...props}>
    <Flex align="center" gap={8}>{children}</Flex>
          </IonButton>)
}
