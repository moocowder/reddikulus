import { useEffect, useState } from "react"
// import Cinema from "./Cinema"

const Viewer = ({ posts, index, setIndex, setView, Cinema }) => {
  let [translate, setTranslate] = useState({ x: 0, y: 0 })
  let [scale, setScale] = useState(1)
  let [start, setStart] = useState({ x: 0, y: 0 })
  let [zoomTranslate, setZoomTranslate] = useState({ x: 0, y: 0 })
  const a = 1.3

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return
      setView(false)
      document.body.style.overflow = "auto"
    })
  }, [])

  function handleMouseMove(e) {
    e.preventDefault()

    if (scale === 1) return

    setTranslate({
      x: (-e.clientX + start.x) * scale + zoomTranslate.x,
      y: (-e.clientY + start.y) * scale + zoomTranslate.y,
    })
  }

  function handleWheel(e) {
    e.preventDefault()
    setStart({ x: e.clientX, y: e.clientY })

    let delta
    var xs = (e.clientX - translate.x) / scale
    var ys = (e.clientY - translate.y) / scale

    delta = e.wheelDelta ? e.wheelDelta : -e.deltaY
    delta > 0 ? (scale *= a) : (scale /= a)

    if (scale < a) {
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    } else {
      setZoomTranslate({ x: e.clientX - xs * scale, y: e.clientY - ys * scale })
      setTranslate({ x: e.clientX - xs * scale, y: e.clientY - ys * scale })
      setScale(scale)
    }
  }

  function next(e) {
    e.preventDefault()
    if (e.target.localName === "a") return
    if (posts.length - 1 === index) return

    setIndex(index + 1)

    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  function prev(e) {
    if (e.target.localName === "a") return
    if (index === 0) return
    setIndex(index - 1)
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  function format(number) {
    if (number < 999) return number
    return (Math.round(number / 100) / 10).toFixed(1) + " k"
  }

  return (
    <div
      className="container"
      onMouseMove={(e) => {
        handleMouseMove(e)
      }}
      onClick={(e) => {
        prev(e)
      }}
      onContextMenu={(e) => {
        next(e)
      }}
    >
      <a
        href={"https://reddit.com" + posts[index].data.permalink}
        target="_blank"
        style={{
          color: "white",
          zIndex: 2,
          position: "fixed",
          textShadow: "0 0 8px 1px black",
        }}
      >
        {posts[index]?.data.title}
      </a>
      <b
        style={{
          color: "red",
          zIndex: 2,
          position: "fixed",
          top: "30px",
          textShadow: "0 0 8px 1px black",
        }}
      >
        {format(posts[index].data.ups)}
      </b>
      <p
        style={{
          color: "white",
          zIndex: 2,
          position: "fixed",
          textShadow: "0 0 8px 1px black",
        }}
      >
        {posts[index].data.user}
      </p>
      <b
        style={{
          color: "white",
          zIndex: 1,
          position: "absolute",
          bottom: "5px",
          right: "5px",
          margin: "5px",
          textShadow: "0 0 8px 1px black",
        }}
      >
        {index + 1}/{posts.length}
      </b>
      <img className="background" src={posts[index].data.url} alt="" />
      <div
        id="zoom"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
        }}
      >
        <Cinema
          src={posts[index].data.media.reddit_video.fallback_url}
          id="image"
          onWheel={(e) => {
            handleWheel(e)
          }}
        ></Cinema>
        {/* <img
          id="image"
          src={posts[index].data.url}
          alt="zoom"
          onWheel={(e) => {
            handleWheel(e)
          }}
        /> */}
      </div>
    </div>
  )
}

export default Viewer
