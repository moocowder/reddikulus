import styles from "../styles/cinema.module.css"
import { useState, useRef, useEffect } from "react"
import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg"
import { MdReplay } from "react-icons/md"
import { VscDebugRestart } from "react-icons/vsc"
import { FaUndoAlt, FaVolumeUp, FaVolumeMute } from "react-icons/fa"
import { ImSpinner9 } from "react-icons/im"

//check if there is audio
//get audio
//if timestamp then move video and audio to timestamp
//if autoplay then play video and audio

function Cinema({
  src,
  thumbnail,
  duration,
  // poster,
  // onClick = (t) => {},
}) {
  const [state, setState] = useState("loading")
  const [timer, setTimer] = useState("00:00")
  const [progress, setProgress] = useState(0)
  const [moving, setMoving] = useState(false)
  const [sound, setSound] = useState(false)
  // const [poster, setPoster] = useState(thumbnail)
  const [audioSrc, setAudioSrc] = useState("")
  let t
  const [voice, setVoice] = useState(null)
  let media = useRef()
  let audio = useRef()

  // useEffect(() => {
  //   if (hasAudio) return
  //   fetch(src.replace(/DASH_\d+/, "DASH_audio"))
  //     .then((d) => {
  //       d.status === 200 && setAudioSrc(src.replace(/DASH_\d+/, "DASH_audio"))
  //     })
  //     .catch((e) => console.log(e, src, "does NOT have audio"))
  // }, [hasAudio])

  useEffect(() => {
    setState("loading")
    setTimer("00:00")
    setProgress(0)
    setMoving(false)

    fetch(src.replace(/DASH_\d+/, "DASH_audio"))
      .then((d) => {
        d.status === 200 && setAudioSrc(src.replace(/DASH_\d+/, "DASH_audio"))
      })
      .catch((e) => console.log(e, src, "does NOT have audio"))

    media.current.addEventListener("canplay", () => {
      play()
    })

    // play()
    // if (autoplay) {
    //   media.current.play().catch((e) => console.log("autoplay V : ", e))
    //   voice?.play().catch((e) => console.log("autoplay A : ", e))
    // }
  }, [src])

  // useEffect(() => {
  //   if (!autoplay || !voice) return
  //   {
  //     media.current.play()
  //     voice.play()
  //   }
  // }, [autoplay, voice])

  // useEffect(() => {
  //   if (!voice) return
  //   if (timestamp) voice.currentTime = timestamp
  // }, [voice])

  useEffect(() => {
    if (!audioSrc) return
    setVoice(new Audio(audioSrc))

    // voice.play()
    // voice = a

    // voice?.addEventListener("canplay", () => {
    //   setPoster(null)
    //   setSound(true)
    // })
    // return () => setVoice(null)
  }, [audioSrc])

  function handleVideoClick(target) {
    if (state === "init") {
      // media.current.play().catch((e) => console.log("Initplay V", e))
      // voice?.play().catch((e) => console.log("Initplay A", e))
      play()
    } else if (state === "ended") {
      // media.current.play()
      play()
    }
    // else {
    //   if (target.localName !== "svg") {
    //     if (voice) voice.muted = true
    //     onClick(media.current.currentTime)
    //   }
    // }
  }

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
    console.log(">>>>>>>>>>>", voice)
    media.current?.play()
    voice?.play()
  }

  function pause() {
    console.log("+_+++++++", voice)
    media.current.pause()
    voice?.pause()
  }

  function renderIcon() {
    switch (state) {
      // case "init":
      //   return (
      //     <CgPlayButtonO
      //       onClick={() => {
      //         play()
      //       }}
      //       className={`${styles.icon} ${styles.run} ${styles.start}`}
      //     />
      //   )
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
              play()
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
              pause()
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
      <div
        className={styles.timer}
        onClick={(e) => {
          console.log(e.clientX)
          console.log(window.innerWidth)
          // vid.current.see
          media.current.currentTime = (e.clientX / window.innerWidth) * duration
          voice.currentTime = (e.clientX / window.innerWidth) * duration
        }}
      >
        <div style={{ width: `${progress * 100}%` }}></div>
        <span className={styles.info}>
          {timer} / {format(duration)}
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
      // style={{ ...style, width, height }}
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
        // poster="https://i.redd.it/x35cv8yd93i71.jpg"
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
      {renderTimer()}
      {renderSound()}
    </div>
  )
}

export default Cinema
