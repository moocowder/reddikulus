import styles from "../styles/cinema.module.css"
import { useState, useRef, useEffect } from "react"
import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg"
import { MdReplay } from "react-icons/md"
import { VscDebugRestart } from "react-icons/vsc"
import {
  FaUndoAlt,
  FaVolumeUp,
  FaVolumeMute,
  FaPlay,
  FaPause,
  FaUndo,
} from "react-icons/fa"
import { ImSpinner9 } from "react-icons/im"

function Cinema({ src, thumbnail, duration }) {
  const [state, setState] = useState("loading")
  const [timer, setTimer] = useState("00:00")
  const [progress, setProgress] = useState(0)
  const [sound, setSound] = useState(false)
  const [show, setShow] = useState(true)
  const [audioSrc, setAudioSrc] = useState("")
  const [voice, setVoice] = useState(null)
  let media = useRef()
  let timeout = useRef()

  useEffect(() => {
    setState("loading")
    setTimer("00:00")
    setProgress(0)

    setShow(1)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setShow(0)
    }, 3000)

    // fetch(src.replace(/DASH_\d+/, "DASH_audio"))
    //   .then((d) => {
    //     d.status === 200 && setAudioSrc(src.replace(/DASH_\d+/, "DASH_audio"))
    //   })
    //   .catch((e) => console.log(e, src, "does NOT have audio"))

    media.current.addEventListener("canplay", () => {
      play()
    })
  }, [src])

  // useEffect(() => {
  //   if (!audioSrc) return
  //   setVoice(new Audio(audioSrc))
  // }, [audioSrc])

  function updateTimer() {
    if (!media.current) return
    let time = format(media.current.currentTime)
    setTimer(time)
    setProgress(media.current.currentTime / duration)
  }

  function format(s) {
    let minutes = Math.floor(s / 60)
    let seconds = Math.floor(s % 60)

    minutes = ("0" + minutes).slice(-2)
    seconds = ("0" + seconds).slice(-2)

    return minutes + ":" + seconds
  }

  function play() {
    media.current?.play()
    voice?.play()
  }

  function pause() {
    media.current.pause()
    voice?.pause()
  }

  function renderIcon() {
    switch (state) {
      case "ended":
        return (
          <div
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation()
              play()
            }}
          >
            <FaUndoAlt />
          </div>
        )
      case "paused":
        return (
          <div
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation()
              play()
            }}
          >
            <FaPlay />
          </div>
        )
      case "loading":
        return (
          <div className={styles.icon}>
            <ImSpinner9 className={` ${styles.loading}`} />
          </div>
        )
      case "running":
        return (
          <div
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation()
              pause()
            }}
          >
            <FaPause />
          </div>
        )
    }
  }

  function renderControls() {
    return (
      <div
        style={{
          opacity: show || state === "paused" || state === "ended" ? 1 : 0,
        }}
        className={styles.controls}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseMove={(e) => e.stopPropagation()}
      >
        <span className={styles.info}>
          {timer} / {format(duration)}
        </span>
        <div
          onClick={(e) => {
            e.stopPropagation()
            media.current.currentTime =
              (e.clientX / window.innerWidth) * duration
            voice.currentTime = (e.clientX / window.innerWidth) * duration
          }}
          className={styles.timer}
        >
          {/* <div className={styles.bar}> */}
          <div
            className={styles.progress}
            style={{ width: `${progress * 100}%` }}
          ></div>
          {/* </div> */}
        </div>
      </div>
    )
  }

  function renderSound() {
    if (!sound || state === "init" || state === "ended") return
    return <FaVolumeUp className={`${styles.unmute} ${styles.info}`} />
  }

  function handleMouseMove() {
    // if (scale === 1) {
    setShow(1)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setShow(0)
    }, 3000)
    // }
  }

  function handleMouseEnter(e) {
    clearTimeout(timeout.current)
  }

  return (
    <div className={styles.player} onMouseMove={() => handleMouseMove()}>
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
        poster={thumbnail}
        className={styles.video}
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* {audioSrc && (
        <audio ref={audio} key={"a" + src}>
          <source src={audioSrc} type="audio/mp4" />
        </audio>
      )} */}
      <img src={src} alt="" />
      {renderIcon()}
      {renderControls()}
      {renderSound()}
    </div>
  )
}

export default Cinema
