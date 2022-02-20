import { useEffect, useRef, useState } from "react"
import useEventListener from "../hooks/useEventListener"
import useTimedState from "../hooks/useTimedState"
import styles from "../styles/cinema.module.css"
import Zoom from "./zoom"

interface Props {
  url: string
  thumbnail: string
}

type State = "running" | "paused"

function Gif({ url, thumbnail }: Props) {
  const [state, setState] = useState<State>("running")
  const [wheeled, setWheeled, cancelWheeled] = useTimedState(false)
  let [zoomed, setZoomed] = useState(false)

  let media = useRef<HTMLVideoElement>(null)

  useEventListener("keydown", (e) => {
    if (e.key === " ") {
      if (state === "running") setState("paused")
      else setState("running")
    }
  })

  useEffect(() => {
    setState("running")
    media.current?.play()
  }, [url])

  useEffect(() => {
    try {
      if (state === "running") media.current?.play()
      else media.current?.pause()
    } catch (e) {
      console.log(e)
    }
  }, [state])

  function handleWheel(e: any) {
    if (!zoomed && !wheeled && e.deltaY > 0) {
      if (state === "running") setState("paused")
      else setState("running")
      setWheeled(true, false, 300)
    }
  }

  return (
    <div onWheel={(e) => handleWheel(e)} className={styles.player}>
      <img src={thumbnail} className={styles.background} alt="" />
      <Zoom setZoomed={setZoomed}>
        <video
          key={url}
          ref={media}
          className={styles.video}
          poster={thumbnail}
          loop={true}
        >
          <source src={url} type="video/mp4" />
        </video>
      </Zoom>
    </div>
  )
}
export default Gif
