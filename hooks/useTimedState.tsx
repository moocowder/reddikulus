import { useRef } from "react"
import { useState } from "react"

function useTimedState(
  init: boolean
): [boolean, (state: boolean, interval?: number) => void, () => void] {
  const [state, setState] = useState(init)
  let timeout = useRef<any>()

  function setTimedState(state: boolean, interval?: number): void {
    setState(state)
    clearTimeout(timeout.current)
    if (interval)
      timeout.current = setTimeout(() => {
        setState(!state)
      }, interval)
  }

  function cancel() {
    clearTimeout(timeout.current)
  }

  return [state, setTimedState, cancel]
  //return {}
  // const [show, setShow, cancel] = useTimedState(false, 3000)
}
export default useTimedState
