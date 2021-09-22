import styles from "../styles/film.module.css"

function Film({
  thumbnails,
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
  return (
    <div
      className={styles.film}
      onWheel={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => onMouseEnter()}
      style={{ opacity: opacity ? 1 : 0 }}
      //cuz if u keep moving we gonna have to close u in 3s again
      onMouseMove={(e) => e.stopPropagation()}
    >
      {thumbnails.map((t, i) => (
        <img
          className={`${styles.img} ${index === i && styles.selected}`}
          onClick={() => setIndex(i)}
          src={t}
        />
      ))}
    </div>
  )
}
export default Film
