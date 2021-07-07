import styles from "../styles/cinema.module.css"
import { useState, useRef, useEffect } from "react"
import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg"
import { MdReplay } from "react-icons/md"

function Cinema({ src, style, bonus = () => {} }) {
  const [paused, setPaused] = useState(true)
  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)
  const [timer, setTimer] = useState("00:00")
  const [progress, setProgress] = useState(0)

  let media = useRef()

  useEffect(() => {
    media.current.addEventListener("ended", () => {
      setEnded(true)
    })
    media.current.addEventListener("timeupdate", () => {
      updateTimer()
    })
  }, [])

  function handleVideoClick() {
    if (!started) {
      media.current.play()
      setPaused(false)
      setStarted(true)
    } else {
      bonus()
    }
  }

  function getIcon() {
    if (ended)
      return (
        <MdReplay
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
        />
      )
    return (
      <CgPlayPauseO
        onClick={() => {
          media.current.pause()
          setPaused(true)
        }}
      />
    )
  }

  function updateTimer() {
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

  return (
    <div
      className={styles.player}
      style={style}
      onClick={() => {
        handleVideoClick()
      }}
    >
      <video className={styles.video} ref={media}>
        <source src={src} type="video/mp4" />
      </video>
      {started ? (
        <div className={styles.controls}>
          <button
            className={styles.btn}
            className={styles.play}
            data-icon="P"
            aria-label="play pause toggle"
          >
            {getIcon()}
          </button>
          <div className={styles.timer}>
            <div style={{ width: `${progress * 100}%` }}></div>
            <span aria-label="timer">
              {timer} / {format(media.current.duration)}
            </span>
          </div>
          <button
            className={styles.btn}
            className={styles.rwd}
            data-icon="B"
            aria-label="rewind"
          ></button>
          <button
            className={styles.btn}
            className={styles.fwd}
            data-icon="F"
            aria-label="fast forward"
          ></button>
        </div>
      ) : (
        <CgPlayButtonO className={styles.start} />
      )}
    </div>
  )
}

export default Cinema
