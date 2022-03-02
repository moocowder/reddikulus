import { useRef, useState } from "react"
import styles from "../styles/bar.module.css"

interface Props {
  progress: number
  buffer: number
  loading: boolean
  duration: number
  setSeek: Function
  peek: string
  ratio: number
}

function Bar({
  progress,
  buffer,
  loading,
  duration,
  setSeek,
  peek,
  ratio,
}: Props) {
  const [preview, setPreview] = useState(false)

  let peekRef = useRef<HTMLVideoElement>(null)
  let timestampRef = useRef<HTMLElement>(null)

  function handleMouseMove(e: any) {
    if (!peekRef.current) return
    peekRef.current.currentTime = (e.clientX / window.innerWidth) * duration
    peekRef.current.style.left = e.clientX - (100 + ratio * 100) / 2 + "px"
    if (!timestampRef.current) return
    timestampRef.current.style.left = e.clientX - 50 + "px"
    timestampRef.current.innerHTML = format(
      (e.clientX / window.innerWidth) * duration
    )
  }

  function format(s: number) {
    let minutes: number = Math.floor(s / 60)
    let seconds: number = Math.floor(s % 60)
    return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
  }

  return (
    <div
      className={styles.timer}
      onClick={(e) => {
        e.stopPropagation()
        setSeek((e.clientX / window.innerWidth) * duration)
      }}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseEnter={() => setPreview(true)}
      onMouseLeave={() => setPreview(false)}
    >
      <div className={styles.bar}>
        {preview && (
          <>
            <video
              ref={peekRef}
              className={styles.peek}
              style={{ width: 100 + ratio * 100 }}
            >
              <source src={peek} type="video/mp4" />
            </video>
            <b ref={timestampRef} className={styles.timestamp}></b>
          </>
        )}

        <div
          className={styles.progress}
          style={{ width: `${progress * 100}%` }}
        ></div>
        <div
          className={styles.buffer}
          style={{ width: `${buffer * 100}%` }}
        ></div>
        {loading && <div className={styles.loading}></div>}
      </div>
    </div>
  )
}

export default Bar
