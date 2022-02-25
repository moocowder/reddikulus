import { useEffect, useRef, useState } from "react"
import styles from "../styles/vaudio.module.css"
interface Props {
  state: string
  setState: Function
  src: string
  quality: string
  audioKey: string | null
  volume: number
  muted: boolean
  setMuted: Function
  speed: number
  jump: number | null
  timer: number
  setTimer: Function
  setBuffer: Function
  poster: string
}

function Vaudio({
  state,
  setState,
  src,
  quality,
  audioKey,
  volume,
  muted,
  setMuted,
  speed,
  jump,
  timer,
  setTimer,
  setBuffer,
  poster,
}: Props) {
  const [vplay, setVplay] = useState(false)
  const [aplay, setAplay] = useState(false)

  let media = useRef<HTMLVideoElement>(null)
  let audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (state === "running") play()
    if (state === "paused") pause()
  }, [state])

  // useEffect(() => {
  //   if (vplay && aplay) {
  //     // alert("run")
  //     setState("running")
  //   }
  // }, [vplay, aplay])
  useEffect(() => {
    seek(timer)
    setState("loading")
    audio.current?.pause()
  }, [quality])

  useEffect(() => {
    if (media.current) media.current.playbackRate = speed
    if (audio.current) audio.current.playbackRate = speed
  }, [speed])

  useEffect(() => {
    if (jump !== null) seek(jump)
  }, [jump])

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

  useEffect(() => {}, [jump])
  function play() {
    try {
      // if (audio.current) {
      //   audio.current?.play()
      //   if (media.current) audio.current.currentTime = media.current.currentTime
      // }
      media.current?.play()
    } catch (e) {
      console.log(e)
    }
  }

  function pause() {
    media.current?.pause()
    audio.current?.pause()
  }

  function seek(t: number) {
    if (media.current) media.current.currentTime = t
    if (audio.current) audio.current.currentTime = t
  }
  return (
    <>
      <video
        ref={media}
        poster={timer === 0 ? poster : ""}
        key={"v" + src + quality}
        onPlaying={() => {
          setState("running") //for when seek

          if (audio.current) {
            if (media.current)
              audio.current.currentTime = media.current.currentTime
            audio.current?.play()
          }
        }}
        // onPlaying={() => setState("running")}
        // onPause={() => {
        //   // alert("iam the problem")
        //   setState("paused")
        // }}
        // onPlay={() => {
        //   setState("running")
        // }}
        onCanPlay={() => {
          // alert("oo")
          // setVplay(true)
          console.log("video can play")
          setState("running")
        }}
        onEnded={() => setState("ended")}
        onTimeUpdate={(e: any) => setTimer(e.target.currentTime)}
        onProgress={(e: any) => {
          if (e.target.buffered.length)
            setBuffer(e.target.buffered.end(e.target.buffered.length - 1))
        }}
        onWaiting={() => {
          // audio.current?.pause()
          setState("loading")
        }}
        // onCanPlay={() => play()}
        // poster={thumbnail}
        className={styles.video}
      >
        {/* <source src={src.replace(/DASH_\d+/, "DASH_240")} type="video/mp4" /> */}
        <source
          src={quality !== "none" ? src.replace(/DASH_.*/, quality) : src}
          type="video/mp4"
        />
      </video>
      {audioKey && (
        <audio
          ref={audio}
          key={"a" + src + audioKey}
          onCanPlay={() => {
            // setAplay(true)
            console.log("audio can play")
          }}
          autoPlay={false}
          // onWaiting={() => {
          //   media.current?.pause()
          //   setState("loading")
          // }}
        >
          <source src={src.replace(/DASH_.*/, audioKey)} type="audio/mp4" />
        </audio>
      )}
    </>
  )
}

export default Vaudio
