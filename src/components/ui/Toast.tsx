import { IonToast } from "@ionic/react"
import { ComponentPropsWithoutRef, FC } from "react"

export type ToastProps = ComponentPropsWithoutRef<typeof IonToast>

export const Toast: FC<ToastProps> = props => {
  return <IonToast {...props} />
}
