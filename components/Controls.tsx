import { useEffect } from "react"
import { useState } from "react"
import styles from "../styles/controls.module.css"
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi"
import { MdHighQuality } from "react-icons/md"
import { IoSpeedometerSharp } from "react-icons/io5"

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
  state,
  onMouseEnter,
  duration,
  seek,
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
  const [progress, setProgress] = useState<number>(0)
  const [palette, setPalette] = useState(false)
  const [volumePalette, setVolumePalette] = useState(false)
  const [dashboard, setDashboard] = useState(false)
  const speeds: number[] = [0.25, 0.5, 1, 1.5, 1.75, 2]

  useEffect(() => {
    setProgress(timer / duration)
  }, [timer])

  return (
    <div
      className={styles.controls}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseMove={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.top}>
        <span className={styles.time}>
          {format(timer)}/{format(duration)}
        </span>

        <Sound
          sound={sound}
          volume={volume}
          setVolume={setVolume}
          muted={muted}
          setMuted={setMuted}
          volumePalette={volumePalette}
          setVolumePalette={setVolumePalette}
        />
        {qualities.length !== 0 && (
          <Qualities
            qualities={qualities}
            quality={quality}
            setQuality={setQuality}
            palette={palette}
            setPalette={setPalette}
          />
        )}
        <Dashboard
          speeds={speeds}
          speed={speed}
          setSpeed={setSpeed}
          dashboard={dashboard}
          setDashboard={setDashboard}
        />
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

function Sound({
  sound,
  volume,
  setVolume,
  muted,
  setMuted,
  volumePalette,
  setVolumePalette,
}: {
  volume: number
  setVolume: Function
  sound: boolean
  muted: boolean
  setMuted: Function
  volumePalette: boolean
  setVolumePalette: Function
}) {
  function clamp(n: number) {
    return n > 100 ? 100 : n < 0 ? 0 : n
  }

  return (
    <span
      className={styles.sound}
      onMouseLeave={() => setVolumePalette(false)}
      onMouseEnter={() => setVolumePalette(true)}
    >
      {sound ? (
        <>
          {muted ? (
            <GiSpeakerOff
              style={{ color: muted ? "var(--sorbe)" : "" }}
              onClick={(e) => setMuted(false)}
            />
          ) : (
            <GiSpeaker onClick={(e) => setMuted(true)} />
          )}
          {volumePalette && (
            <span
              className={styles.slider}
              onClick={(e) =>
                setVolume(clamp(window.innerHeight - e.clientY - 50) / 100)
              }
            >
              <span>
                <span style={{ height: `${volume * 100}%` }}></span>
              </span>
            </span>
          )}
        </>
      ) : (
        <GiSpeakerOff style={{ color: "grey" }} />
      )}
    </span>
  )
}

function Dashboard({
  speeds,
  speed,
  setSpeed,
  dashboard,
  setDashboard,
}: {
  speeds: number[]
  speed: number
  setSpeed: Function
  dashboard: boolean
  setDashboard: Function
}) {
  return (
    <div
      className={styles.quality}
      onMouseLeave={() => setDashboard(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <IoSpeedometerSharp onMouseEnter={() => setDashboard(true)} />
      {dashboard && (
        <ul className={styles.dashboard}>
          {speeds?.map((s) => (
            <li
              onClick={() => setSpeed(s)}
              style={{
                background: speed === s ? "var(--sorbe)" : "",
                color: speed === s ? "white" : "",
              }}
            >
              x{s}
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
  palette,
  setPalette,
}: {
  qualities: string[]
  quality: string
  setQuality: Function
  palette: boolean
  setPalette: Function
}) {
  return (
    <div
      className={styles.quality}
      onMouseLeave={() => setPalette(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <MdHighQuality onMouseEnter={() => setPalette(true)} />
      {palette && (
        <div className={styles.palette}>
          {[...qualities].reverse().map((q) => (
            <span
              key={q}
              onClick={(e) => setQuality(q)}
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
  )
}
export default Controls
