import { useEffect, useRef } from "react"
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
  seek: number | null
  setSeek: Function
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
  seek,
  setSeek,
  timer,
  setTimer,
  setBuffer,
  poster,
}: Props) {
  let media = useRef<HTMLVideoElement>(null)
  let audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (state === "running") play()
    if (state === "paused") pause()
    if (state === "loading") audio.current?.pause()
  }, [state])

  useEffect(() => {
    jump(timer)
    setState("loading")
  }, [quality])

  useEffect(() => {
    if (media.current) media.current.playbackRate = speed
    if (audio.current) audio.current.playbackRate = speed
  }, [speed])

  useEffect(() => {
    if (seek === null) return
    jump(seek)
    setSeek(null)
  }, [seek])

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

  function play() {
    try {
      media.current?.play()
    } catch (e) {
      console.log(e)
    }
  }

  function pause() {
    try {
      media.current?.pause()
      audio.current?.pause()
    } catch (e) {
      console.log(e)
    }
  }

  function jump(t: number) {
    if (media.current) media.current.currentTime = t
    if (audio.current) audio.current.currentTime = t
  }

  return (
    <>
      <video
        ref={media}
        className={styles.video}
        poster={timer === 0 ? poster : ""}
        key={"v" + src + quality}
        onCanPlay={() => setState("running")}
        onPlaying={() => {
          setState("running") //for when seek

          if (audio.current) {
            if (media.current)
              audio.current.currentTime = media.current.currentTime
            audio.current?.play()
          }
        }}
        onTimeUpdate={(e: any) => setTimer(e.target.currentTime)}
        onProgress={(e: any) => {
          if (e.target.buffered.length)
            setBuffer(e.target.buffered.end(e.target.buffered.length - 1))
        }}
        onWaiting={() => setState("loading")}
        onEnded={() => setState("ended")}
      >
        {quality && (
          <source
            src={quality !== "none" ? src.replace(/DASH_.*/, quality) : src}
            type="video/mp4"
          />
        )}
      </video>
      {audioKey && (
        <audio ref={audio} key={"a" + src + audioKey}>
          <source src={src.replace(/DASH_.*/, audioKey)} type="audio/mp4" />
        </audio>
      )}
    </>
  )
}

export default Vaudio
