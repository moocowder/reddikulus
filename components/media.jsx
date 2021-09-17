import Cinema from "../components/Cinema"
import Gallery from "../components/gallery"
import styles from "../styles/media.module.css"
import Imagine from "./imagine"
import Zoom from "./zoom"

function Media({ media }) {
  return (
    <div className={styles.wrapper}>
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
        <>
          <img src={media.thumbnail} className={styles.background} alt="" />
          <Zoom>
            <Imagine
              thumbnail={media.thumbnail}
              original={media.url}
              alt="image"
            />
          </Zoom>
        </>
      )}
      {media.type === "gallery" && (
        <Gallery
          urls={media.urls}
          thumbnails={media.thumbnails}
          fullscreen={true}
        />
      )}
    </div>
  )
}
export default Media
