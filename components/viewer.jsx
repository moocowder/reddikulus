import { useEffect, useState } from "react"

const Viewer = ({ pics, index, setIndex, setView }) => {
  console.log("mr index", index)
  let [translate, setTranslate] = useState({ x: 0, y: 0 })
  let [scale, setScale] = useState(1)
  let [start, setStart] = useState({ x: 0, y: 0 })
  let [zoomTranslate, setZoomTranslate] = useState({ x: 0, y: 0 })
  const a = 1.3

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" ? setView(false) : console.log(e.key)
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
    if (pics.length - 1 === index) return

    setIndex(index + 1)

    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  function prev() {
    if (index === 0) return
    setIndex(index - 1)
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  return (
    <div
      className="container"
      onMouseMove={(e) => {
        handleMouseMove(e)
      }}
      onClick={() => {
        prev()
      }}
      onContextMenu={(e) => {
        next(e)
      }}
    >
      <b
        style={{
          color: "white",
          zIndex: 1,
          position: "absolute",
          margin: "5px",
          textShadow: "0 0 8px 1px black",
        }}
      >
        {"posts[index]?.title"}
      </b>
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
        {index + 1}/{pics.length}
      </b>
      <img className="background" src={pics[index]} alt="" />
      <div
        id="zoom"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
        }}
      >
        <img
          id="image"
          src={pics[index]}
          alt="zoom"
          onWheel={(e) => {
            handleWheel(e)
          }}
        />
      </div>
    </div>
  )
}

export default Viewer
