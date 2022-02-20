import styles from "../styles/icon.module.css"
import {
  FaUndoAlt,
  FaVolumeUp,
  FaVolumeMute,
  FaPlay,
  FaPause,
  FaUndo,
} from "react-icons/fa"
import {
  BsPlay,
  BsPlayFill,
  BsPause,
  BsArrowCounterclockwise,
} from "react-icons/bs"
// import {BsPauseCircle} from 'react-icons/'
import { FiPauseCircle } from "react-icons/fi"
import { RiPauseMiniLine } from "react-icons/ri"
import useTimedState from "../hooks/useTimedState"
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5"
import { TiMediaPauseOutline } from "react-icons/ti"
import { useEffect, useState } from "react"

interface Props {
  state: "running" | "loading" | "paused" | "ended"
  setState: Function
  // play: Function
  // pause: Function
  onMouseEnter: Function
}

function Icon({ state, setState, onMouseEnter }: Props) {
  return (
    <div
      onMouseEnter={() => onMouseEnter()}
      onMouseMove={(e) => e.stopPropagation()}
      className={styles.icon}
      onClick={(e) => {
        e.stopPropagation()
        if (state === "ended" || state === "paused") setState("running")
        else setState("paused")
      }}
    >
      {state === "ended" && <BsArrowCounterclockwise />}
      {(state === "running" || state === "loading") && <FiPauseCircle />}
      {state === "paused" && <IoPlayOutline />}
    </div>
  )
}
export default Icon
