import { useRef } from "react"

export function useDebounce<CallbackArgs extends Array<unknown>>(callback: (...args: CallbackArgs) => void, delay: number) {
  const timeoutId = useRef<NodeJS.Timeout>(null)
  return function (...args: CallbackArgs) {
    if (timeoutId.current) { // This check is not strictly necessary
      clearTimeout(timeoutId.current)
    }
    timeoutId.current = setTimeout(
      () => callback(...args), delay,
    )
  }
}