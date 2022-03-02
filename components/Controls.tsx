import { useState } from "react"
import styles from "../styles/controls.module.css"
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi"
import { RiSettings2Line, RiDashboard3Line } from "react-icons/ri"

interface Props {
  onMouseEnter: Function
  duration: number
  sound: any
  timer: number
  qualities: string[]
  quality: string
  setQuality: (q: string) => void
  volume: number
  setVolume: Function
  muted: boolean
  setMuted: Function
  speed: number
  setSpeed: Function
}

function format(s: number) {
  let minutes: number = Math.floor(s / 60)
  let seconds: number = Math.floor(s % 60)
  return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
}

function Controls({
  onMouseEnter,
  duration,
  sound,
  timer,
  qualities,
  quality,
  setQuality,
  volume,
  setVolume,
  muted,
  setMuted,
  speed,
  setSpeed,
}: Props) {
  return (
    <div
      className={styles.controls}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseMove={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {sound && (
        <Sound
          volume={volume}
          setVolume={setVolume}
          muted={muted}
          setMuted={setMuted}
        />
      )}

      {qualities.length !== 0 && (
        <Qualities
          qualities={qualities}
          quality={quality}
          setQuality={setQuality}
        />
      )}
      <Dashboard speed={speed} setSpeed={setSpeed} />
      <span className={styles.time}>
        <span>{format(timer)}</span> /{format(duration)}
      </span>
    </div>
  )
}

function Sound({
  volume,
  setVolume,
  muted,
  setMuted,
}: {
  volume: number
  setVolume: Function
  muted: boolean
  setMuted: Function
}) {
  const [palette, setPalette] = useState(false)
  function clamp(n: number) {
    return n > 100 ? 100 : n < 0 ? 0 : n
  }

  return (
    <span
      className={styles.sound}
      onMouseLeave={() => setPalette(false)}
      onMouseEnter={() => setPalette(true)}
    >
      {muted ? (
        <BiVolumeMute
          style={{ color: muted ? "var(--sorbe)" : "" }}
          onClick={(e) => setMuted(false)}
        />
      ) : (
        <BiVolumeFull onClick={(e) => setMuted(true)} />
      )}
      {palette && (
        <span
          className={styles.slider}
          onClick={(e) =>
            setVolume(clamp(window.innerHeight - e.clientY - 70) / 100)
          }
        >
          <span>
            <span style={{ height: `${volume * 100}%` }}></span>
          </span>
        </span>
      )}
    </span>
  )
}

function Dashboard({ speed, setSpeed }: { speed: number; setSpeed: Function }) {
  const [dashboard, setDashboard] = useState(false)
  const speeds: number[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

  return (
    <div
      className={styles.speed}
      onMouseLeave={() => setDashboard(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <RiDashboard3Line onMouseEnter={() => setDashboard(true)} />
      {dashboard && (
        <ul className={styles.dashboard}>
          {speeds?.map((s) => (
            <li
              key={s}
              onClick={() => setSpeed(s)}
              style={{
                background: speed === s ? "var(--sorbe)" : "",
                color: speed === s ? "white" : "",
              }}
            >
              {s}x
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Qualities({
  qualities,
  quality,
  setQuality,
}: {
  qualities: string[]
  quality: string
  setQuality: Function
}) {
  const [palette, setPalette] = useState(false)
  return (
    <div
      className={styles.quality}
      onMouseLeave={() => setPalette(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <RiSettings2Line onMouseEnter={() => setPalette(true)} />
      {palette && (
        <div className={styles.palette}>
          {[...qualities].reverse().map((q) => (
            <span
              key={q}
              onClick={(e) => setQuality(q)}
              style={{
                background: quality === q ? "var(--sorbe)" : "",
              }}
            >
              {q.replace(/.mp4/, "").replace(/\D+/, "") + "p"}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
export default Controls
