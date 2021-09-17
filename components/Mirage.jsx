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
  const [state, setstate] = useState("one")
  const [progress, setProgress] = useState(0)

  let vid = useRef()
  useEffect(() => {
    if (state !== "two") return

    vid.current.playbackRate = 3
  }, [state])

  function format(s) {
    let minutes = Math.floor(s / 60)
    let seconds = Math.floor(s % 60)

    minutes = ("0" + minutes).slice(-2)
    seconds = ("0" + seconds).slice(-2)

    return minutes + ":" + seconds
  }

  return (
    <div
      style={{ border: "0px solid white" }}
      // onMouseEnter={() => setstate("two")}
      // onMouseLeave={() => setstate("one")}
    >
      <span className={styles.duration}>{format(duration)}</span>
      {state === "one" && (
        <div>
          <FaPlay className={`${styles.icon} `} />
          {/* <CgPlayButtonO className={`${styles.icon} `} /> */}
          <Imagine thumbnail={thumbnail} original={poster} />
        </div>
      )}
      {state === "two" && (
        <div>
          <video
            // onClick={() => setstate("three")}
            ref={vid}
            style={{ width: "100%", height: "100%" }}
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
