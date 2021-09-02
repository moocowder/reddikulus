import styles from "../styles/film.module.css"

function Film({
  thumbnails,
  index,
  setIndex,
}: {
  thumbnails: string[]
  index: number
  setIndex: Function
}) {
  return (
    <div
      className={styles.film}
      onWheel={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
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
