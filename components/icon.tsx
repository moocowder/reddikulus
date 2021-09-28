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

interface Props {
  state: "running" | "loading" | "paused" | "ended"
  play: Function
  pause: Function
}

function Icon({ state, play, pause }: Props) {
  const [display, setDisplay, cancel] = useTimedState(false)
  return (
    <div
      // onMouseMove={() => setDisplay(true, 1000)}
      className={styles.icon}
      onClick={(e) => {
        e.stopPropagation()
        setDisplay(true, 200)
        // cancel()
        if (state === "ended" || state === "paused") play()
        else pause()
      }}
    >
      <span style={{ opacity: display ? 1 : 0 }}>
        {state === "ended" && <FaUndoAlt />}
        {state === "running" && <FaPause />}
        {state === "paused" && <FaPlay />}
      </span>
    </div>
  )
}
export default Icon
