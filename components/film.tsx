import { useState } from "react"
import styles from "../styles/film.module.css"

function Film({
  thumbnails,
  // ratios,
  index,
  setIndex,
  onMouseEnter,
  opacity,
}: {
  thumbnails: string[]
  index: number
  setIndex: Function
  onMouseEnter: Function
  opacity: boolean
}) {
  const [h, setH] = useState(300)
  const gap = 20
  const frameH = 120

  function moveTo(i: number) {
    setIndex(i)
    setH(h + (index - i) * (frameH + gap))
  }

  return (
    <div
      className={styles.film}
      onWheel={(e) => {
        e.stopPropagation()
        // e.preventDefault()
        if (e.deltaY < 0) {
          if (index === 0) return
          moveTo(index - 1)
        }
        if (e.deltaY > 0) {
          if (index === thumbnails.length - 1) return
          moveTo(index + 1)
        }
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => onMouseEnter()}
      style={{ opacity: opacity ? 1 : 0 }}
      //cuz if u keep moving we gonna have to close u in 3s again
      onMouseMove={(e) => e.stopPropagation()}
    >
      <div
        className={styles.container}
        style={{ transform: `translate(0,${h}px)`, gap: `${gap}px` }}
      >
        {thumbnails.map((t, i) => (
          <div className={styles.frame} style={{ height: `${frameH}px` }}>
            <img
              className={`${styles.img} ${index === i && styles.selected}`}
              onClick={() => moveTo(i)}
              src={t}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Film
