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

interface Props {
  src: string
  thumbnail: string
  duration: number
  dash: string
}

type State = "running" | "loading" | "paused" | "ended"
function Cinema({ src, thumbnail, duration, dash }: Props) {
  const [state, setState] = useState<State>("loading")
  const [timer, setTimer] = useState<number>(0)
  // const [sound, setSound] = useState(false)
  // const [show, setShow] = useState(true)
  const [audioSrc, setAudioSrc] = useState("")
  const { audio: audioKey, video: videoKeys } = useLoadKeys(dash)
  const [quality, setQuality] = useState<string>("")
  // const [voice, setVoice] = useState(null)

  // let sound = useLoadSound(src)
  // const [sound, setSound] = useState()
  let media = useRef<HTMLVideoElement>()
  let audio = useRef<HTMLAudioElement>()
  // let voice = audio.current
  const [ctrlDisplay, setCtrlDisplay, cancel] = useTimedState(false)
  const [wheeled, setWheeled, cancelWheeled] = useTimedState(false)
  let [zoomed, setZoomed] = useState(false)

  useEventListener("keydown", (e) => {
    if (e.key === " ") {
      if (state === "running") pause()
      else play()
    }
  })
  // let timeout = useRef()

  useEffect(() => {
    if (!audioKey) return

    setAudioSrc(src.replace(/DASH_.*/, audioKey))
  }, [audioKey])

  useEffect(() => {
    // let tt = timer
    if (!videoKeys) return
    setQuality(videoKeys[0])
  }, [videoKeys])

  useEffect(() => {
    seek(timer)
    setState("loading")
    audio.current?.pause()
  }, [quality])
  useEffect(() => {
    setState("loading")
    setTimer(0)

    setCtrlDisplay(true, 3000)
  }, [src])

  // useEffect(() => {
  //   if (!audio.current) return
  //   audio.current.currentTime = media.current.currentTime
  // }, [audio.current])

  function play() {
    try {
      media.current?.play()
      if (audio.current) audio.current?.play() //this is the one!!!!!!
    } catch (e) {
      console.log(e)
    }
  }

  function pause() {
    media.current?.pause()
    audio.current?.pause()
  }

  function handleMouseMove() {
    setCtrlDisplay(true, 3000)
  }

  // function handleMouseEnter(e: any) {
  //   cancel()
  // }

  function seek(t: number) {
    if (media.current) media.current.currentTime = t
    if (audio.current) audio.current.currentTime = t
  }

  function handleWheel(e: any) {
    if (!zoomed && !wheeled && e.deltaY > 0) {
      if (state === "running") pause()
      else play()
      setWheeled(true, 300)
    }
  }

  return (
    <div
      onWheel={(e) => handleWheel(e)}
      className={styles.player}
      onMouseMove={() => handleMouseMove()}
    >
      <img src={thumbnail} className={styles.background} alt="" />
      <img src={src} alt="" />

      <Zoom setZoomed={setZoomed}>
        <video
          ref={media}
          key={"v" + src + quality}
          onPlaying={() => {
            if (audio.current) audio.current?.play()
            setState("running")
          }}
          onPause={() => {
            // alert("iam the problem")
            setState("paused")
          }}
          onEnded={() => setState("ended")}
          onTimeUpdate={(e: any) => setTimer(e.target.currentTime)}
          onWaiting={() => {
            audio.current?.pause()
            setState("loading")
          }}
          onCanPlay={() => play()}
          // poster={thumbnail}
          className={styles.video}
        >
          {/* <source src={src.replace(/DASH_\d+/, "DASH_240")} type="video/mp4" /> */}
          <source
            src={quality ? src.replace(/DASH_.*/, quality) : src}
            type="video/mp4"
          />
        </video>

        {audioSrc && (
          <audio ref={audio} key={"a" + audioSrc}>
            <source src={audioSrc} type="audio/mp4" />
          </audio>
        )}
        {(ctrlDisplay || state !== "running") && (
          <Icon state={state} play={play} pause={pause} onMouseEnter={cancel} />
        )}

        <Controls
          state={state}
          show={ctrlDisplay}
          onMouseEnter={cancel}
          duration={duration}
          seek={(t: number) => seek(t)}
          sound={audioKey}
          timer={timer}
          qualities={videoKeys}
          quality={quality}
          setQuality={setQuality}
        />
      </Zoom>
    </div>
  )
}

export default Cinema
