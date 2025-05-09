import {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
  Ref,
} from 'react'
import { ElementTypeMap } from '../../types'
import { FlexProps, flexStyle } from './Flex.style'

export type FlexContainerProps<TTag extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<TTag> &
    FlexProps & {
      as?: TTag
      ref?: Ref<ElementTypeMap<TTag>>
    }
>

export const FlexContainer = <TTag extends ElementType>({
  as,
  children,
  ...props
}: FlexContainerProps<TTag>) => {
  const Component = as ?? 'div'
  return (
    <Component style={flexStyle(props)} {...props}>
      {children}
    </Component>
  )
}
