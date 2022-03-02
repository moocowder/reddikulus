import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import Imagine from "./imagine"
import styles from "../styles/mirage.module.css"
import { FaPlay } from "react-icons/fa"
import { BsLightningFill } from "react-icons/bs"

type Props = {
  thumbnail: string
  poster: string
  peek: string
  duration?: number
}

function Mirage({ thumbnail, poster, peek, duration }: Props) {
  const [hover, setHover] = useState(false)
  const [progress, setProgress] = useState(0)

  let vid = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!hover) return
    if (vid.current?.playbackRate) vid.current.playbackRate = duration ? 3 : 1
  }, [hover])

  function format(s: number) {
    let minutes = ("0" + Math.floor(s / 60)).slice(-2)
    let seconds = ("0" + Math.floor(s % 60)).slice(-2)

    return minutes + ":" + seconds
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {duration && <span className={styles.duration}>{format(duration)}</span>}

      <div className={styles.poster}>
        {!hover &&
          (duration ? (
            <FaPlay className={`${styles.icon}`} />
          ) : (
            <BsLightningFill className={`${styles.icon}`} />
          ))}

        <Imagine thumbnail={thumbnail} original={poster} />
      </div>

      {hover && (
        <div className={styles.peek}>
          <video
            ref={vid}
            autoPlay
            src={peek}
            onTimeUpdate={() => {
              if (duration && vid.current)
                setProgress(vid.current.currentTime / duration)
            }}
            loop
          ></video>
          {duration && (
            <div
              className={styles.bar}
              style={{ width: `${progress * 100}%` }}
            ></div>
          )}
        </div>
      )}
    </div>
  )
}
export default Mirage
