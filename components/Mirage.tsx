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
type Props = {
  thumbnail: string
  poster: string
  peek: string
  duration: number
  onClick: () => void
  isGif: boolean
}

function Mirage({
  thumbnail,
  poster,
  peek,
  duration,
  onClick = () => {},
  isGif = false,
}: Props) {
  const [hover, setHover] = useState(false)
  const [progress, setProgress] = useState(0)

  let vid = useRef<HTMLVideoElement>()

  useEffect(() => {
    if (!hover) return
    if (vid.current?.playbackRate) vid.current.playbackRate = 1
  }, [hover])

  function format(s: number) {
    let minutes = ("0" + Math.floor(s / 60)).slice(-2)
    let seconds = ("0" + Math.floor(s % 60)).slice(-2)

    return minutes + ":" + seconds
  }

  return (
    <div
      // style={{ border: "5px solid white" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!isGif && <span className={styles.duration}>{format(duration)}</span>}

      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        {isGif ? (
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
            onTimeUpdate={() => {
              if (vid.current) setProgress(vid.current.currentTime / duration)
            }}
            // controls
            loop
          ></video>
          {/* <div className={styles.timer}> */}
          {!isGif && (
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
