import styles from "../styles/cinema.module.css"
import { useState, useRef, useEffect } from "react"
import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg"
import { MdReplay } from "react-icons/md"
import { VscDebugRestart } from "react-icons/vsc"
import { ImSpinner9 } from "react-icons/im"
import Zoom from "./zoom"
import Controls from "./Controls"
import Icon from "./icon"
import useLoadSound from "../hooks/useLoadSound"
import useTimedState from "../hooks/useTimedState"
import useEventListener from "../hooks/useEventListener"
import useLoadKeys from "../hooks/useLoadKeys"
import Bar from "./bar"
import Vaudio from "./vaudio"

interface Props {
  src: string
  thumbnail: string
  duration: number
  dash: string
  peek: string
  ratio: number
}

type State = "running" | "loading" | "paused" | "ended"
function Cinema({ src, thumbnail, duration, dash, peek, ratio }: Props) {
  const [state, setState] = useState<State>("loading")
  const [timer, setTimer] = useState<number>(0)
  const [buffer, setBuffer] = useState(0)
  const { audio: audioKey, video: videoKeys } = useLoadKeys(dash)
  const [quality, setQuality] = useState<string>("")
  const [volume, setVolume] = useState<number>(1)
  const [muted, setMuted] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(1)
  const [jump, setJump] = useState<number | null>(null)

  const [ctrlDisplay, setCtrlDisplay, cancel] = useTimedState(false)
  const [wheeled, setWheeled, cancelWheeled] = useTimedState(false)
  let [zoomed, setZoomed] = useState(false)

  useEventListener("keydown", (e) => {
    if (e.key === " ") {
      if (state === "running") setState("paused")
      else setState("running")
    }
  })

  useEffect(() => {
    if (!videoKeys) return
    setQuality(videoKeys[0])
  }, [videoKeys])

  // useEffect(() => {
  //   seek(timer)
  //   setState("loading")
  //   audio.current?.pause()
  // }, [quality])

  useEffect(() => {
    setState("loading")
    setTimer(0)

    setCtrlDisplay(true, false, 3000)
  }, [src])

  function handleMouseMove() {
    setCtrlDisplay(true, false, 3000)
  }

  // function seek(t: number) {
  //   if (media.current) media.current.currentTime = t
  //   if (audio.current) audio.current.currentTime = t
  // }

  function handleWheel(e: any) {
    if (!zoomed && !wheeled && e.deltaY > 0) {
      if (state === "running") setState("paused")
      else setState("running")
      setWheeled(true, false, 300)
    }
  }

  return (
    <div
      onWheel={(e) => handleWheel(e)}
      className={styles.player}
      onMouseMove={() => handleMouseMove()}
    >
      <img src={thumbnail} className={styles.background} alt="" />

      <Zoom setZoomed={setZoomed}>
        <Vaudio
          state={state}
          setState={setState}
          src={src}
          quality={quality}
          audioKey={audioKey}
          volume={volume}
          muted={muted}
          setMuted={setMuted}
          speed={speed}
          jump={jump}
          setTimer={setTimer}
          setBuffer={setBuffer}
        />
        {(ctrlDisplay || state !== "running") && !zoomed && (
          <>
            <Icon
              state={state}
              setState={setState}
              // play={play}
              // pause={pause}
              onMouseEnter={cancel}
            />
            <Controls
              onMouseEnter={cancel}
              duration={duration}
              sound={audioKey}
              timer={timer}
              qualities={videoKeys}
              quality={quality}
              setQuality={setQuality}
              volume={volume}
              setVolume={setVolume}
              muted={muted}
              setMuted={setMuted}
              speed={speed}
              setSpeed={setSpeed}
            />
          </>
        )}

        {!zoomed && (
          <Bar
            loading={state === "loading"}
            progress={timer / duration}
            buffer={buffer / duration}
            // onClick={(p: number) => {
            //   seek(p * duration)
            // }}
            duration={duration}
            seek={(t: number) => {
              setJump(t)
            }}
            peek={peek}
            ratio={ratio}
          />
        )}
      </Zoom>
    </div>
  )
}

export default Cinema
