import Cinema from "../components/Cinema"
import Gallery from "../components/gallery"

function Media({ media, onWheel }) {
  if (media.type === "video")
    return (
      <Cinema
        src={media.url}
        // src={post.thumbnail}
        id="image"
        timestamp={media.timestamp || 0}
        width="100vw"
        height="100vh"
        autoplay={true}
      ></Cinema>
    )
  else if (media.type === "image")
    return (
      <img
        src={media.url}
        alt="image"
        onWheel={(e) => {
          onWheel(e)
        }}
      />
    )
  else return <Gallery urls={media.urls} fullscreen={true} />
}
export default Media
