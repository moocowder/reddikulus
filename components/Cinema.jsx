import styles from "../styles/cinema.module.css"
import { useState, useRef, useEffect } from "react"
import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg"
import { MdReplay } from "react-icons/md"
import { VscDebugRestart } from "react-icons/vsc"
import { ImSpinner9 } from "react-icons/im"

function Cinema({
  src,
  style,
  width,
  height,
  timestamp = null,
  autoplay = false,
  onClick = () => {},
}) {
  const [paused, setPaused] = useState(false)
  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)
  const [timer, setTimer] = useState("00:00")
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [moving, setMoving] = useState(false)

  let t

  let media = useRef()
  let audio = useRef()

  useEffect(() => {
    media.current.addEventListener("ended", () => {
      setEnded(true)
    })
    media.current.addEventListener("timeupdate", () => {
      updateTimer()
    })
    media.current.addEventListener("playing", () => {
      setLoading(false)
    })
    media.current.addEventListener("waiting", () => {
      setLoading(true)
    })
  }, [])

  useEffect(() => {
    //after adding typescript : 'start' | 'loading' | 'running' | 'paused' | 'ended'
    setStarted(false)
    setPaused(false)
    setEnded(false)
    setTimer("00:00")
    setProgress(0)
    setLoading(false)
    setMoving(false)

    media.current.addEventListener("ended", () => {
      setEnded(true)
    })
    media.current.addEventListener("timeupdate", () => {
      updateTimer()
    })
    media.current.addEventListener("playing", () => {
      setLoading(false)
    })
    media.current.addEventListener("waiting", () => {
      setLoading(true)
    })

    if (autoplay) {
      media.current.play()
      // audio.current.play()
      setPaused(false)
      setStarted(true)
    }
  }, [src])

  // useEffect(() => {
  //   if (timestamp !== null) {
  //     media.current.currentTime = timestamp
  //     media.current.play()
  //     setStarted(true)
  //     setPaused(false)
  //   }
  // }, [timestamp])
  function handleVideoClick(target) {
    if (!started) {
      media.current.play()
      audio.current.play()
      setPaused(false)
      setStarted(true)
    } else if (ended) {
      media.current.play()
      setPaused(false)
      setEnded(false)
    } else {
      if (target.localName !== "svg") onClick(media.current.currentTime)
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
    if (!started)
      return (
        <CgPlayButtonO
          name="icon"
          onClick={() => {
            media.current.play()
            setPaused(false)
          }}
          className={`${styles.icon} ${styles.run}`}
        />
      )
    if (ended)
      return (
        <VscDebugRestart
          className={`${styles.icon} ${styles.run}`}
          onClick={() => {
            media.current.play()
            setPaused(false)
            setEnded(false)
          }}
        />
      )
    if (paused)
      return (
        <CgPlayButtonO
          onClick={() => {
            media.current.play()
            setPaused(false)
          }}
          className={`${styles.icon} ${styles.pause}`}
        />
      )
    if (loading)
      return <ImSpinner9 className={`${styles.icon} ${styles.loading}`} />
    return (
      <CgPlayPauseO
        onClick={() => {
          media.current.pause()
          setPaused(true)
        }}
        className={`${styles.icon} ${styles.pause}`}
      />
    )
  }

  function renderTimer() {
    if (!started || ended) return
    if (!paused && !moving) return
    return (
      <div className={styles.controls}>
        <div className={styles.timer}>
          <div style={{ width: `${progress * 100}%` }}></div>
          <span>
            {timer} / {format(media?.current?.duration)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={styles.player}
      style={{ ...style, width, height }}
      onMouseMove={() => {
        clearTimeout(t)
        setMoving(true)
        t = setTimeout(() => {
          setMoving(false)
        }, 2000)
      }}
      onClick={({ target }) => {
        handleVideoClick(target)
      }}
    >
      <video ref={media} key={src} className={styles.video}>
        <source src={src} type="video/mp4" />
      </video>
      <audio ref={audio}>
        <source src={src.replace(/DASH_.../, "DASH_audio")} type="video/mp4" />
      </audio>
      <img src={src} alt="" />
      {renderIcon()}
      {renderTimer()}
    </div>
  )
}

export default Cinema
