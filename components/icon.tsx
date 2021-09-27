import styles from "../styles/icon.module.css"
import {
  FaUndoAlt,
  FaVolumeUp,
  FaVolumeMute,
  FaPlay,
  FaPause,
  FaUndo,
} from "react-icons/fa"

interface Props {
  state: "running" | "loading" | "paused" | "ended"
  play: Function
  pause: Function
}

function Icon({ state, play, pause }: Props) {
  return (
    <div
      className={styles.icon}
      onClick={(e) => {
        e.stopPropagation()
        if (state === "ended" || state === "paused") play()
        else pause()
      }}
    >
      {state === "ended" && <FaUndoAlt />}
      {state === "running" && <FaPause />}
      {state === "paused" && <FaPlay />}
    </div>
  )
}
export default Icon
