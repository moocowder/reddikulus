import styles from "../styles/film.module.css"

interface Props {
  thumbnails: string[]
  index: number
  setIndex: Function
  h: number
  gap: number
  frameH: number
  onMouseEnter: Function
}

function Film({
  thumbnails,
  index,
  setIndex,
  h,
  gap,
  frameH,
  onMouseEnter,
}: Props) {
  return (
    <div
      className={styles.film}
      onWheel={(e) => {
        e.stopPropagation()
        if (e.deltaY < 0) {
          if (index === 0) return
          setIndex(index - 1)
        }
        if (e.deltaY > 0) {
          if (index === thumbnails.length - 1) return
          setIndex(index + 1)
        }
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => onMouseEnter()}
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
              onClick={() => setIndex(i)}
              src={t}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Film
