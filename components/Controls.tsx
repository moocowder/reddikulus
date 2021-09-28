import { useEffect } from "react"
import { useState } from "react"
import styles from "../styles/controls.module.css"
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi"

interface Props {
  state: "running" | "loading" | "paused" | "ended"
  show: boolean
  onMouseEnter: Function
  duration: number
  seek: Function
  //   progress: number
  sound: any
  timer: number
}

function format(s: number) {
  let minutes: number = Math.floor(s / 60)
  let seconds: number = Math.floor(s % 60)
  return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
}

function Controls({
  state,
  show,
  onMouseEnter,
  duration,
  seek,
  sound,
  timer,
}: Props) {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    setProgress(timer / duration)
  }, [timer])

  return (
    <div
      style={{
        opacity: show || state !== "running" ? 1 : 0,
      }}
      className={styles.controls}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseMove={(e) => e.stopPropagation()}
    >
      <span className={styles.info}>
        {format(timer)} / {format(duration)}
      </span>
      {!sound.loading && (sound.src ? <GiSpeaker /> : <GiSpeakerOff />)}
      <div
        onClick={(e) => {
          e.stopPropagation()
          seek((e.clientX / window.innerWidth) * duration)
        }}
        className={`${styles.timer} ${state === "loading" && styles.loading}`}
      >
        {/* <div className={styles.bar}> */}
        <div
          className={styles.progress}
          style={{ width: `${progress * 100}%` }}
        ></div>
        {/* </div> */}
      </div>
    </div>
  )
}
export default Controls
