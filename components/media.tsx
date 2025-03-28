import Cinema from "./Cinema"
import Gallery from "./gallery"
import styles from "../styles/media.module.css"
import Imagine from "./imagine"
import Zoom from "./zoom"
import {
  Gif as GifType,
  Image,
  Video,
  Gallery as GalleryType,
} from "../schema/post"
import { useRef, useState } from "react"
import Gif from "../components/gif"

interface Props {
  media: GifType | Video | Image | GalleryType
}

function Media({ media }: Props) {
  const [loading, setLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className={styles.media}>
      {media.type === "video" && (
        <Cinema
          src={media.url}
          thumbnail={media.thumbnail}
          duration={media.duration}
          dash={media.dash}
          peek={media.peek}
          ratio={media.ratio}
        />
      )}
      {media.type === "image" && (
        <>
          <img src={media.thumbnail} className={styles.background} alt="" />
          <Zoom>
            <Imagine
              thumbnail={media.thumbnail}
              original={media.url}
              appeared={() => setLoading(false)}
            />
          </Zoom>
        </>
      )}
      {media.type === "gallery" && (
        <Gallery urls={media.urls} thumbnails={media.thumbnails} />
      )}
      {media.type === "gif" && (
        <Gif thumbnail={media.thumbnail} url={media.url} />
      )}
    </div>
  )
}
export default Media
