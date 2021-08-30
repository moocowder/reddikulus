import Cinema from "../components/Cinema"
import Gallery from "../components/gallery"
import styles from "../styles/media.module.css"
import Imagine from "./imagine"

function Media({ media, onWheel, transform }) {
  return (
    <div
      className={styles.wrapper}
      style={{ transform: transform }}
      onWheel={(e) => {
        onWheel(e)
      }}
    >
      {media.type === "video" && (
        <Cinema
          src={media.url}
          thumbnail={media.thumbnail}
          duration={media.duration}
          // id="image"
          // timestamp={media.timestamp || 0}
          // autoplay={true}
        ></Cinema>
      )}
      {media.type === "image" && (
        <Imagine thumbnail={media.thumbnail} original={media.url} alt="image" />
      )}
      {media.type === "gallery" && (
        <Gallery urls={media.urls} fullscreen={true} />
      )}
    </div>
  )
}
export default Media
