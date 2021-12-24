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
  onMouseEnter: Function
}

function Icon({ state, play, pause, onMouseEnter }: Props) {
  return (
    <div
      onMouseEnter={() => onMouseEnter()}
      onMouseMove={(e) => e.stopPropagation()}
      className={styles.icon}
      onClick={(e) => {
        e.stopPropagation()
        if (state === "ended" || state === "paused") play()
        else pause()
      }}
    >
      {state === "ended" && <FaUndoAlt />}
      {(state === "running" || state === "loading") && <FaPause />}
      {state === "paused" && <FaPlay />}
    </div>
  )
}
export default Icon
