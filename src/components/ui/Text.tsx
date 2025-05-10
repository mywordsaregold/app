import { IonText } from "@ionic/react"
import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  PropsWithChildren,
} from "react"

export type TextProps<TTag extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<TTag> &
    ComponentPropsWithoutRef<typeof IonText> & {
      readonly as?: TTag
    }
> & {
  readonly align?: CSSProperties["textAlign"]
}

export const Text = <TTag extends ElementType>({
  as,
  children,
  ...props
}: TextProps<TTag>) => {
  const Component = as ?? "p"
  const style: CSSProperties = {
    textAlign: props.align,
  }
  return (
    <IonText style={style} {...props}>
      <Component>{children}</Component>
    </IonText>
  )
}
