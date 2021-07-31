import styles from "../styles/cinema.module.css"
import { useState, useRef, useEffect } from "react"
import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg"
import { MdReplay } from "react-icons/md"
import { VscDebugRestart } from "react-icons/vsc"
import { FaUndoAlt, FaVolumeUp, FaVolumeMute } from "react-icons/fa"
import { ImSpinner9 } from "react-icons/im"

function Cinema({
  src,
  style,
  width,
  height,
  timestamp = null,
  autoplay = false,
  onClick = (t) => {},
}) {
  const [state, setState] = useState("init")
  const [timer, setTimer] = useState("00:00")
  const [progress, setProgress] = useState(0)
  const [moving, setMoving] = useState(false)
  const [sound, setSound] = useState(false)

  let t

  let media = useRef()
  let audio = useRef()

  useEffect(() => {
    // let a = new Audio(src.replace(/DASH_\d+/, "DSH_audio"))
    // a.play
    // console.log("0000000000000", a)
    // fetch(src.replace(/DASH_\d+/, "DASH_audio"))
    //   .then((r) => console.log("all good"))
    //   .catch((e) => console.log("something fishy"))
    //'init' | 'loading' | 'running' | 'paused' | 'ended'
    setState("init")
    setTimer("00:00")
    setProgress(0)
    setMoving(false)

    media.current.addEventListener("ended", () => {
      setState("ended")
    })
    media.current.addEventListener("timeupdate", () => {
      updateTimer()
    })
    media.current.addEventListener("playing", () => {
      //play audio
      audio.current.play()
      setState("running")
    })
    media.current.addEventListener("waiting", () => {
      //pause audio
      audio.current.pause()
      setState("loading")
    })
    media.current.addEventListener("pause", () => {
      //if waiting
      setState("paused")
    })
    audio.current.addEventListener("canplay", () => {
      setSound(true)
    })
    if (timestamp !== null) {
      media.current.currentTime = timestamp
      audio.current.currentTime = timestamp
    }
    if (autoplay) {
      media.current.play()
      audio.current.play()
    }
  }, [src])

  function handleVideoClick(target) {
    if (state === "init") {
      media.current.play()
      audio.current.play()
    } else if (state === "ended") {
      media.current.play()
    } else {
      if (target.localName !== "svg") {
        audio.current.muted = true
        onClick(media.current.currentTime)
      }
    }
  }

  function updateTimer() {
    if (!media.current) return
    let time = format(media.current.currentTime)
    setTimer(time)
    setProgress(media.current.currentTime / media.current.duration)
    // let barLength =
    //   timerWrapper.clientWidth * (media.currentTime / media.duration)
    // timerBar.style.width = barLength + "px"
  }

  function format(s) {
    let minutes = Math.floor(s / 60)
    let seconds = Math.floor(s % 60)

    minutes = ("0" + minutes).slice(-2)
    seconds = ("0" + seconds).slice(-2)

    return minutes + ":" + seconds
  }

  function renderIcon() {
    switch (state) {
      case "init":
        return (
          <CgPlayButtonO
            onClick={() => {
              media.current.play()
              audio.current.play()
            }}
            className={`${styles.icon} ${styles.run} ${styles.start}`}
          />
        )
      case "ended":
        return (
          <FaUndoAlt
            className={`${styles.icon} ${styles.run} ${styles.start}`}
            onClick={() => {
              media.current.play()
            }}
          />
        )
      case "paused":
        return (
          <CgPlayButtonO
            onClick={() => {
              media.current.play()
              audio.current.play()
            }}
            className={`${styles.icon} ${styles.run} ${styles.paused}`}
          />
        )
      case "loading":
        return <ImSpinner9 className={`${styles.icon} ${styles.loading}`} />
      case "running":
        return (
          <CgPlayPauseO
            onClick={() => {
              media.current.pause()
              audio.current.pause()
            }}
            className={`${styles.icon} ${styles.pause}`}
          />
        )
    }
  }

  function renderTimer() {
    if (state === "init" || state === "ended") return
    // if (state === "running" && !moving) return

    return (
      // <div className={styles.controls}>
      <div className={styles.timer}>
        <div style={{ width: `${progress * 100}%` }}></div>
        <span className={styles.info}>
          {timer} / {format(media?.current?.duration)}
        </span>
      </div>
      // </div>
    )
  }

  function renderSound() {
    if (!sound || state === "init" || state === "ended") return
    return <FaVolumeUp className={`${styles.unmute} ${styles.info}`} />
  }

  return (
    <div
      className={styles.player}
      style={{ ...style, width, height }}
      // onMouseMove={() => {
      //   clearTimeout(t)
      //   setMoving(true)
      //   t = setTimeout(() => {
      //     setMoving(true)
      //   }, 4000)
      // }}
      onClick={({ target }) => {
        handleVideoClick(target)
      }}
    >
      <video ref={media} key={"v" + src} className={styles.video}>
        <source src={src} type="video/mp4" />
      </video>
      <audio ref={audio} key={"a" + src}>
        <source src={src.replace(/DASH_\d+/, "DASH_audio")} type="audio/mp4" />
      </audio>
      <img src={src} alt="" />
      {renderIcon()}
      {renderTimer()}
      {renderSound()}
    </div>
  )
}

export default Cinema
