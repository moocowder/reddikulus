import { useEffect } from "react"
import { useState } from "react"
import styles from "../styles/controls.module.css"
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi"
import { MdHighQuality } from "react-icons/md"
import { IoSpeedometerSharp } from "react-icons/io5"
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi"
import { VscDashboard } from "react-icons/vsc"
import { RiDashboard2Line } from "react-icons/ri"
// import {GrDashboard} from 'react-icons/gr'
import { BsGearFill } from "react-icons/bs"
import Bar from "./bar"

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
  // const [palette, setPalette] = useState(false)
  // const [volumePalette, setVolumePalette] = useState(false)
  // const [dashboard, setDashboard] = useState(false)
  // const speeds: number[] = [0.25, 0.5, 1, 1.5, 1.75, 2]

  return (
    <div
      className={styles.controls}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseMove={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {sound && (
        <Sound
          // sound={sound}
          volume={volume}
          setVolume={setVolume}
          muted={muted}
          setMuted={setMuted}
          // volumePalette={volumePalette}
          // setVolumePalette={setVolumePalette}
        />
      )}

      {qualities.length !== 0 && (
        <Qualities
          qualities={qualities}
          quality={quality}
          setQuality={setQuality}
          // palette={palette}
          // setPalette={setPalette}
        />
      )}

      <Dashboard
        // speeds={speeds}
        speed={speed}
        setSpeed={setSpeed}
        // dashboard={dashboard}
        // setDashboard={setDashboard}
      />
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
}: // volumePalette,
// setVolumePalette,
{
  volume: number
  setVolume: Function
  muted: boolean
  setMuted: Function
  // volumePalette: boolean
  // setVolumePalette: Function
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
            setVolume(clamp(window.innerHeight - e.clientY - 50) / 100)
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

function Dashboard({
  // speeds,
  speed,
  setSpeed,
}: // dashboard,
// setDashboard,
{
  // speeds: number[]
  speed: number
  setSpeed: Function
  // dashboard: boolean
  // setDashboard: Function
}) {
  const [dashboard, setDashboard] = useState(false)
  const speeds: number[] = [0.25, 0.5, 1, 1.5, 1.75, 2]

  return (
    <div
      className={styles.speed}
      onMouseLeave={() => setDashboard(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <VscDashboard onMouseEnter={() => setDashboard(true)} />
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
}: // palette,
// setPalette,
{
  qualities: string[]
  quality: string
  setQuality: Function
  // palette: boolean
  // setPalette: Function
}) {
  const [palette, setPalette] = useState(false)
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
