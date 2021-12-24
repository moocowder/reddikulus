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
  const [audioSrc, setAudioSrc] = useState("")
  const { audio: audioKey, video: videoKeys } = useLoadKeys(dash)
  const [quality, setQuality] = useState<string>("")
  const [volume, setVolume] = useState<number>(1)
  const [muted, setMuted] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(1)

  let media = useRef<HTMLVideoElement>(null)
  let audio = useRef<HTMLAudioElement>(null)

  const [ctrlDisplay, setCtrlDisplay, cancel] = useTimedState(false)
  const [wheeled, setWheeled, cancelWheeled] = useTimedState(false)
  let [zoomed, setZoomed] = useState(false)

  useEventListener("keydown", (e) => {
    if (e.key === " ") {
      if (state === "running") pause()
      else play()
    }
  })

  useEffect(() => {
    if (media.current) media.current.playbackRate = speed
    if (audio.current) audio.current.playbackRate = speed
  }, [speed])

  useEffect(() => {
    if (!audio.current) return
    if (volume === 0) setMuted(true)
    else {
      setMuted(false)
      audio.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audio.current) audio.current.muted = muted
  }, [muted])
  // useEffect(()=>{},[qualiti])
  useEffect(() => {
    if (!audioKey) return

    setAudioSrc(src.replace(/DASH_.*/, audioKey))
  }, [audioKey])

  useEffect(() => {
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

    setCtrlDisplay(true, false, 3000)
  }, [src])

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
    setCtrlDisplay(true, false, 3000)
  }

  function seek(t: number) {
    if (media.current) media.current.currentTime = t
    if (audio.current) audio.current.currentTime = t
  }

  function handleWheel(e: any) {
    if (!zoomed && !wheeled && e.deltaY > 0) {
      if (state === "running") pause()
      else play()
      setWheeled(true, false, 300)
    }
  }

  // function setVolume(v: number) {
  //   if (!audio.current) return
  //   if (v === 0) audio.current.muted = !audio.current.muted
  //   else audio.current.volume = v
  // }

  // function mute() {
  //   if (!audio.current) return
  //   audio.current.muted = true
  // }

  return (
    <div
      onWheel={(e) => handleWheel(e)}
      className={styles.player}
      onMouseMove={() => handleMouseMove()}
    >
      <img src={thumbnail} className={styles.background} alt="" />
      {/* <img src={src} alt="" /> */}

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
          <audio
            ref={audio}
            key={"a" + audioSrc}
            // onWaiting={() => {
            //   media.current?.pause()
            //   setState("loading")
            // }}
          >
            <source src={audioSrc} type="audio/mp4" />
          </audio>
        )}

        {(ctrlDisplay || state !== "running") && !zoomed && (
          <>
            <Icon
              state={state}
              play={play}
              pause={pause}
              onMouseEnter={cancel}
            />
            <Controls
              state={state}
              // show={ctrlDisplay}
              onMouseEnter={cancel}
              duration={duration}
              seek={(t: number) => seek(t)}
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
      </Zoom>
    </div>
  )
}

export default Cinema
