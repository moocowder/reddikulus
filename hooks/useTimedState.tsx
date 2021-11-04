import { useRef } from "react"
import { useState } from "react"

function useTimedState<T>(
  init: T
): [T, (state: T, end?: T, interval?: number) => void, () => void] {
  const [state, setState] = useState(init)
  let timeout = useRef<any>()

  function setTimedState(state: T, end?: T, interval?: number): void {
    setState(state)
    clearTimeout(timeout.current)
    if (interval && end !== undefined)
      timeout.current = setTimeout(() => {
        setState(end)
      }, interval)
  }

  function cancel() {
    clearTimeout(timeout.current)
  }

  return [state, setTimedState, cancel]
}
export default useTimedState
