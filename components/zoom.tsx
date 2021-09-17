import { useState } from "react"

function Zoom(props: any) {
  let [translate, setTranslate] = useState({ x: 0, y: 0 })
  let [scale, setScale] = useState(1)
  let [start, setStart] = useState({ x: 0, y: 0 })
  let [zoomTranslate, setZoomTranslate] = useState({ x: 0, y: 0 })
  const a = 1.3

  function handleWheel(e: any) {
    e.preventDefault()
    // setShow(0)
    setStart({ x: e.clientX, y: e.clientY })

    let delta
    var xs = (e.clientX - translate.x) / scale
    var ys = (e.clientY - translate.y) / scale

    delta = e.wheelDelta ? e.wheelDelta : -e.deltaY
    delta > 0 ? (scale *= a) : (scale /= a)

    if (scale < a) {
      // props.setZoomed(false)
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    } else {
      // props.setZoomed(true)
      setZoomTranslate({ x: e.clientX - xs * scale, y: e.clientY - ys * scale })
      setTranslate({ x: e.clientX - xs * scale, y: e.clientY - ys * scale })
      setScale(scale)
    }
  }

  function handleMouseMove(e: any) {
    if (scale > 1) e.stopPropagation()
    e.preventDefault()

    if (scale === 1) {
      //   setShow(1)
      //   clearTimeout(timeout.current)
      //   timeout.current = setTimeout(() => {
      //     setShow(0)
      //   }, 3000)
      return
    }

    setTranslate({
      x: (-e.clientX + start.x) * scale + zoomTranslate.x,
      y: (-e.clientY + start.y) * scale + zoomTranslate.y,
    })
  }

  return (
    <div
      onWheel={(e) => handleWheel(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      style={{ position: "fixed", top: "0", border: "0px solid white" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transformOrigin: "0px 0px",
          //   border: "3px solid yellow",
          width: "100vw",
          height: "100vh",
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
export default Zoom
