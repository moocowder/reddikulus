import styles from "../styles/icon.module.css"
import { FaPlay, FaPause, FaUndo } from "react-icons/fa"

interface Props {
  state: "running" | "loading" | "paused" | "ended"
  setState: Function
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
      {state === "ended" && <FaUndo />}
      {state === "running" && <FaPause />}
      {state === "paused" && <FaPlay />}
    </div>
  )
}
export default Icon
