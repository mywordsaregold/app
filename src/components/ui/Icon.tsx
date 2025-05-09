import { IonIcon } from "@ionic/react"
import { ComponentPropsWithoutRef, FC } from "react"

export type IconProps = ComponentPropsWithoutRef<typeof IonIcon>

export const Icon: FC<IconProps> = props => {
  return <IonIcon {...props} />
}
