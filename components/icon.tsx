import styles from "../styles/icon.module.css"
import {
  FaUndoAlt,
  FaVolumeUp,
  FaVolumeMute,
  FaPlay,
  FaPause,
  FaUndo,
} from "react-icons/fa"
import useTimedState from "../hooks/useTimedState"
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5"
import { useEffect, useState } from "react"

interface Props {
  state: "running" | "loading" | "paused" | "ended"
  play: Function
  pause: Function
  onMouseEnter?: Function
}

function Icon({ state, play, pause, onMouseEnter }: Props) {
  // const [display, setDisplay, cancel] = useTimedState(false)
  // useEffect(() => {
  //   if (state === "ended") return
  //   setDisplay(false)
  // }, [state])

  return (
    <div
      // onMouseMove={() => setDisplay(true, 1000)}
      // onMouseLeave={() => setDisplay(false)}
      // onMouseEnter={() => onMouseEnter()}
      className={styles.icon}
      onClick={(e) => {
        e.stopPropagation()
        // setDisplay(false)
        if (state === "ended" || state === "paused") play()
        else pause()
      }}
    >
      <span>
        {state === "ended" && <FaUndoAlt />}
        {state === "running" && <IoPauseOutline />}
        {state === "paused" && <IoPlayOutline />}
      </span>
    </div>
  )
}
export default Icon
