import styles from "../styles/cinema.module.css"
import { useState, useEffect } from "react"
import Zoom from "./zoom"
import Controls from "./Controls"
import Icon from "./icon"
import useTimedState from "../hooks/useTimedState"
import useEventListener from "../hooks/useEventListener"
import useLoadKeys from "../hooks/useLoadKeys"
import Bar from "./bar"
import Vaudio from "./vaudio"
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi"

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
  const [seek, setSeek] = useState<number | null>(null)
  const speeds: number[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3]
  const [sign, setSign, cancelSign] = useTimedState<any>("")

  const [ctrlDisplay, setCtrlDisplay, cancel] = useTimedState(false)
  const [wheeled, setWheeled, cancelWheeled] = useTimedState(false)
  let [zoomed, setZoomed] = useState(false)

  useEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "k") {
      if (state === "loading") return
      if (state === "running") setState("paused")
      else setState("running")
    } else if (e.key === "l") {
      setSeek(timer + 5)
      setSign(">> 5", "", 800)
    } else if (e.key === "j") {
      setSeek(timer - 5)
      setSign("<< 5", "", 800)
    } else if (e.key === "m") {
      setMuted(!muted)
      if (audioKey)
        setSign(muted ? <BiVolumeFull /> : <BiVolumeMute />, "", 800)
    } else if (e.key === "h") {
      if (videoKeys.length > 1) setQuality(videoKeys[videoKeys.length - 1])
    } else if (e.key === ">") {
      let i = speeds.indexOf(speed)
      if (i !== speeds.length - 1) {
        setSpeed(speeds[i + 1])
        setSign(`${speeds[i + 1]}x`, "", 800)
      }
    } else if (e.key === "<") {
      let i = speeds.indexOf(speed)
      if (i !== 0) {
        setSpeed(speeds[i - 1])
        setSign(`${speeds[i - 1]}x`, "", 800)
      }
    } else if (e.key === ".") {
      setSpeed(1)
      setSign("1x", "", 800)
    }
  })

  useEffect(() => {
    if (!videoKeys) return
    setQuality(videoKeys[videoKeys.length - 1])
  }, [videoKeys])

  useEffect(() => {
    setState("loading")
    setTimer(0)
    setSpeed(1)
    setMuted(false)
    setCtrlDisplay(true, false, 3000)
  }, [src])

  function handleMouseMove() {
    setCtrlDisplay(true, false, 3000)
  }

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

      {sign && <div className={styles.sign}>{sign}</div>}

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
          seek={seek}
          setSeek={setSeek}
          timer={timer}
          setTimer={setTimer}
          setBuffer={setBuffer}
          poster={thumbnail}
        />
        {(ctrlDisplay || state !== "running") && !zoomed && (
          <>
            <Icon state={state} setState={setState} onMouseEnter={cancel} />
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
              speeds={speeds}
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
            duration={duration}
            setSeek={setSeek}
            peek={peek}
            ratio={ratio}
          />
        )}
      </Zoom>
    </div>
  )
}

export default Cinema
