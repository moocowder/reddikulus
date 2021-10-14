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

function Cinema({ src, thumbnail, duration }) {
  const [state, setState] = useState("loading")
  const [timer, setTimer] = useState("00:00")
  // const [sound, setSound] = useState(false)
  const [show, setShow] = useState(true)
  const [audioSrc, setAudioSrc] = useState("")
  // const [voice, setVoice] = useState(null)
  let sound = useLoadSound(src)
  let media = useRef()
  let audio = useRef()
  let voice = audio.current
  const [ctrlDisplay, setCtrlDisplay, cancel] = useTimedState()
  useEventListener("keydown", (e) => {
    if (e.key === " ") {
      if (state === "running") pause()
      else play()
    }
  })
  // let timeout = useRef()

  useEffect(() => {
    setState("loading")
    setTimer(0)

    setCtrlDisplay(true, 3000)
  }, [src])

  useEffect(() => {
    if (!voice) return
    voice.currentTime = media.current.currentTime
  }, [voice])

  function updateTimer() {
    if (!media.current) return
    setTimer(media.current.currentTime)
  }

  function play() {
    try {
      media.current?.play()
      voice?.play()
    } catch (e) {
      console.log(e)
    }
  }

  function pause() {
    media.current.pause()
    voice?.pause()
  }

  function handleMouseMove() {
    setCtrlDisplay(true, 3000)
  }

  function handleMouseEnter(e) {
    cancel()
  }

  function seek(t) {
    media.current.currentTime = t
    if (voice) voice.currentTime = t
  }

  return (
    <div className={styles.player} onMouseMove={() => handleMouseMove()}>
      <img src={thumbnail} className={styles.background} alt="" />
      <img src={src} alt="" />

      <Zoom>
        {sound.loading && (
          <div
            style={{
              position: "fixed",
              top: "4rem",
              background: "red",
              zIndex: 5,
            }}
          >
            loading
          </div>
        )}
        <video
          ref={media}
          key={"v" + src}
          onPlaying={() => {
            voice?.play()
            setState("running")
          }}
          onPause={() => {
            setState("paused")
          }}
          onEnded={() => {
            setState("ended")
          }}
          onTimeUpdate={updateTimer}
          onWaiting={() => {
            voice?.pause()
            setState("loading")
          }}
          onCanPlay={() => {
            play()
          }}
          poster={thumbnail}
          className={styles.video}
        >
          <source src={src} type="video/mp4" />
        </video>

        {sound.src && (
          <audio ref={audio} key={"a" + sound.src}>
            <source src={sound.src} type="audio/mp4" />
          </audio>
        )}
        <Icon state={state} show={show} play={play} pause={pause} />
        <Controls
          state={state}
          show={ctrlDisplay}
          onMouseEnter={handleMouseEnter}
          duration={duration}
          seek={(t) => seek(t)}
          sound={sound}
          timer={timer}
        />
      </Zoom>
    </div>
  )
}

export default Cinema
