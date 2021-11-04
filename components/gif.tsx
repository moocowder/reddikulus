import { useEffect, useRef, useState } from "react"
import useEventListener from "../hooks/useEventListener"
import useTimedState from "../hooks/useTimedState"
import styles from "../styles/cinema.module.css"
import Zoom from "./zoom"

interface Props {
  url: string
  thumbnail: string
}

type State = "running" | "loading" | "paused" | "ended"

function Gif({ url, thumbnail }: Props) {
  const [state, setState] = useState<State>("loading")
  // const [timer, setTimer] = useState<number>(0)

  let media = useRef<HTMLVideoElement>(null)

  //   const [ctrlDisplay, setCtrlDisplay, cancel] = useTimedState(false)
  const [wheeled, setWheeled, cancelWheeled] = useTimedState(false)
  let [zoomed, setZoomed] = useState(false)

  useEventListener("keydown", (e) => {
    if (e.key === " ") {
      if (state === "running") pause()
      else play()
    }
  })

  useEffect(() => {
    setState("loading")
    // setTimer(0)
    // setCtrlDisplay(true, 3000)
  }, [url])

  function play() {
    try {
      media.current?.play()
    } catch (e) {
      console.log(e)
    }
  }

  function pause() {
    media.current?.pause()
  }

  //   function handleMouseMove() {
  //     setCtrlDisplay(true, 3000)
  //   }

  // function seek(t: number) {
  //   if (media.current) media.current.currentTime = t
  // }

  function handleWheel(e: any) {
    if (!zoomed && !wheeled && e.deltaY > 0) {
      if (state === "running") pause()
      else play()
      setWheeled(true, false, 300)
    }
  }

  return (
    <div
      onWheel={(e) => handleWheel(e)}
      className={styles.player}
      //   onMouseMove={() => handleMouseMove()}
    >
      <img src={thumbnail} className={styles.background} alt="" />
      <Zoom setZoomed={setZoomed}>
        <video
          ref={media}
          key={"v" + url}
          onPlaying={() => setState("running")}
          onPause={() => setState("paused")}
          onEnded={() => setState("ended")}
          // onTimeUpdate={(e: any) => setTimer(e.target.currentTime)}
          onWaiting={() => setState("loading")}
          onCanPlay={() => play()}
          poster={thumbnail}
          className={styles.video}
          loop={true}
        >
          <source src={url} type="video/mp4" />
        </video>
      </Zoom>
    </div>
  )
}
export default Gif
