import { useState } from "react"

interface Props {
  setZoomed?: (b: boolean) => void
  children: any
}
function Zoom({ setZoomed = () => {}, children }: Props) {
  let [translate, setTranslate] = useState({ x: 0, y: 0 })
  let [scale, setScale] = useState(1)
  let [start, setStart] = useState({ x: 0, y: 0 })
  let [zoomTranslate, setZoomTranslate] = useState({ x: 0, y: 0 })
  const a = 1.3

  function handleWheel(e: any) {
    e.preventDefault()
    setStart({ x: e.clientX, y: e.clientY })

    let delta
    var xs = (e.clientX - translate.x) / scale
    var ys = (e.clientY - translate.y) / scale

    delta = e.wheelDelta ? e.wheelDelta : -e.deltaY
    delta > 0 ? (scale *= a) : (scale /= a)

    if (scale < a) {
      setZoomed(false)
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    } else {
      setZoomed(true)
      setZoomTranslate({ x: e.clientX - xs * scale, y: e.clientY - ys * scale })
      setTranslate({ x: e.clientX - xs * scale, y: e.clientY - ys * scale })
      setScale(scale)
    }
  }

  function handleMouseMove(e: any) {
    if (scale > 1) e.stopPropagation()
    e.preventDefault()

    if (scale === 1) return

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
          width: "100vw",
          height: "100vh",
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
export default Zoom
