import { useEffect } from "react"
import { useState } from "react"
import styles from "../styles/controls.module.css"
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi"
import { MdHighQuality } from "react-icons/md"

interface Props {
  state: "running" | "loading" | "paused" | "ended"
  // show: boolean
  onMouseEnter: Function
  duration: number
  seek: Function
  //   progress: number
  sound: any
  timer: number
  qualities: string[]
  quality: string
  setQuality: (q: string) => void
  // volume: number
  // setVolume: Function
  // muted: boolean
}

function format(s: number) {
  let minutes: number = Math.floor(s / 60)
  let seconds: number = Math.floor(s % 60)
  return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
}

function Controls({
  state,
  // show,
  onMouseEnter,
  duration,
  seek,
  sound,
  timer,
  qualities,
  quality,
  setQuality,
}: // volume,
// setVolume,
// muted,
Props) {
  const [progress, setProgress] = useState<number>(0)
  const [palette, setPalette] = useState(false)

  useEffect(() => {
    setProgress(timer / duration)
  }, [timer])

  return (
    <div
      // style={{
      //   opacity: show || state !== "running" ? 1 : 0,
      // }}
      className={styles.controls}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseMove={(e) => e.stopPropagation()}
    >
      <div className={styles.top}>
        <span className={styles.time}>
          {format(timer)}/{format(duration)}
        </span>
        {/* {sound ? (
          muted ? (
            <GiSpeakerOff
              onClick={(e) => {
                e.stopPropagation()
                // volume(0)
                setVolume(1)
              }}
            />
          ) : (
            <GiSpeaker
              onClick={(e) => {
                e.stopPropagation()
                // volume(0)
                setVolume(0)
              }}
            />
          )
        ) : (
          <GiSpeakerOff style={{ color: "grey" }} />
        )} */}
        <div onMouseLeave={() => setPalette(false)}>
          <MdHighQuality onMouseEnter={() => setPalette(true)} />
          {palette && (
            <div className={styles.palette}>
              {[...qualities].reverse().map((q) => (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    setQuality(q)
                  }}
                  style={{
                    background: quality === q ? "var(--sorbe)" : "",
                    color: quality === q ? "white" : "",
                  }}
                >
                  {q.replace(/.mp4/, "").replace(/\D+/, "") + "p"}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={`${styles.timer}`}
        onClick={(e) => {
          e.stopPropagation()
          seek((e.clientX / window.innerWidth) * duration)
        }}
      >
        <div
          className={`${styles.bar} ${state === "loading" && styles.loading}`}
        >
          <div
            className={styles.progress}
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
export default Controls
