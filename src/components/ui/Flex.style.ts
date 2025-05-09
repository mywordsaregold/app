import { CSSProperties } from "react"


export interface FlexProps {
  align?: CSSProperties["alignItems"]
  additionalStyles?: CSSProperties
  direction?: CSSProperties["flexDirection"]
  gap?: CSSProperties["gap"]
  grow?: CSSProperties["flexGrow"] | boolean
  height?: CSSProperties["height"]
  justify?: CSSProperties["justifyContent"]
  styleOverride?: CSSProperties
}


export function flexStyle(props: FlexProps): CSSProperties {
  return props.styleOverride ?? {
    alignItems: props.align,
    display: "flex",
    flexGrow: typeof props.grow === "boolean" ? "1" : props.grow,
    flexDirection: props.direction,
    gap: props.gap,
    height: props.height,
    justifyContent: props.justify,
    ...props.additionalStyles,
  }
}
