import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import Cinema from "./Cinema"
import Imagine from "./imagine"
import styles from "../styles/mirage.module.css"
import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg"
import { FaPlay } from "react-icons/fa"

// type Props = {
//   thumbnail: string
//   poster: string
//   peek: string
//   url: string
// }

function Mirage({ thumbnail, poster, peek, duration, onClick = () => {} }) {
  const [hover, setHover] = useState(false)
  const [progress, setProgress] = useState(0)

  let vid = useRef()
  useEffect(() => {
    if (!hover) return

    vid.current.playbackRate = 3
  }, [hover])

  function format(s) {
    let minutes = Math.floor(s / 60)
    let seconds = Math.floor(s % 60)

    minutes = ("0" + minutes).slice(-2)
    seconds = ("0" + seconds).slice(-2)

    return minutes + ":" + seconds
  }

  return (
    <div
      // style={{ border: "5px solid white" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className={styles.duration}>{format(duration)}</span>

      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <FaPlay className={`${styles.icon} `} />
        {/* <CgPlayButtonO className={`${styles.icon} `} /> */}
        <Imagine thumbnail={thumbnail} original={poster} />
        {/* <img style={{ position: "absolute" }} src={thumbnail} alt="" /> */}
      </div>

      {hover && (
        <div className={styles.peek}>
          <video
            ref={vid}
            // style={{ width: "100%", height: "100%", position: "absolute" }}
            autoPlay
            src={peek}
            onClick={() => {
              onClick()
            }}
            onTimeUpdate={() => setProgress(vid.current.currentTime / duration)}
            // controls
            loop
          ></video>
          {/* <div className={styles.timer}> */}
          <div
            className={styles.bar}
            style={{ width: `${progress * 100}%` }}
          ></div>
          {/* </div> */}
        </div>
      )}
    </div>
  )
}
export default Mirage
