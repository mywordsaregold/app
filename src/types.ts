import { ElementType } from "react"

export type ElementTypeMap<T extends ElementType> =
  T extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[T]
    : HTMLElement;
