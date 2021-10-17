import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import Cinema from "./Cinema"
import Imagine from "./imagine"
import styles from "../styles/mirage.module.css"
import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg"
import { FaPlay } from "react-icons/fa"
import { RiFileGifFill } from "react-icons/ri"
import { AiOutlineGif, AiOutlineFileGif } from "react-icons/ai"
import { BsLightningFill } from "react-icons/bs"
// type Props = {
//   thumbnail: string
//   poster: string
//   peek: string
//   url: string
// }

function Mirage({
  thumbnail,
  poster,
  peek,
  duration,
  onClick = () => {},
  gif = false,
}) {
  const [hover, setHover] = useState(false)
  const [progress, setProgress] = useState(0)

  let vid = useRef()
  useEffect(() => {
    if (!hover) return

    vid.current.playbackRate = 1
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
      {!gif && <span className={styles.duration}>{format(duration)}</span>}

      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        {gif ? (
          // <span className={`${styles.gif} `}>GIF</span>
          <BsLightningFill className={`${styles.icon} `} />
        ) : (
          // <AiOutlineFileGif className={`${styles.icon} `} />
          <FaPlay className={`${styles.icon} `} />
        )}

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
          {!gif && (
            <div
              className={styles.bar}
              style={{ width: `${progress * 100}%` }}
            ></div>
          )}

          {/* </div> */}
        </div>
      )}
    </div>
  )
}
export default Mirage
