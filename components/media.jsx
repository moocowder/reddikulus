import Cinema from "../components/Cinema"
import Gallery from "../components/gallery"
import styles from "../styles/media.module.css"

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
          id="image"
          timestamp={media.timestamp || 0}
          autoplay={true}
        ></Cinema>
      )}
      {media.type === "image" && <img src={media.url} alt="image" />}
      {media.type === "gallery" && (
        <Gallery urls={media.urls} fullscreen={true} />
      )}
    </div>
  )
}
export default Media
