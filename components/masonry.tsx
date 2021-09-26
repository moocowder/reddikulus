import {
  useEffect,
  useState,
  useRef,
  useCallback,
  HTMLAttributeReferrerPolicy,
  useLayoutEffect,
} from "react"
import styles from "../styles/masonry.module.css"
// import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import useWindow from "../hooks/useWindow"
import Image from "next/image"
import Cinema from "./Cinema"
import { Post } from "../schema/post"
import Brick from "../components/brick"
import Infos from "./Infos"
let n

type Props = {
  posts: Post<any>[]
  onBrickClick: (i: number) => void
  loadMore: () => void
  loading: boolean
  hasMore: string
}

function Masonry({ posts, onBrickClick, loadMore, loading, hasMore }: Props) {
  console.log("renderring masonry")
  let rows: number[] = []
  const gap = 30
  let [iw, setIw] = useState(300)
  const [end, setEnd] = useState(false)

  // const iw = 350

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      e.preventDefault()
      console.log("resize...", e)
    })
  }, [])

  const observer = useRef<IntersectionObserver>()
  const lastElementRef = (node: Element) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (hasMore) loadMore()
        else setEnd(true)
      } else {
        setEnd(false)
      }
    })
    if (node) observer.current.observe(node)
  }

  function lastBrick() {
    console.log("***********************")
    if (loading) return
    if (hasMore) loadMore()
    else setEnd(true)
  }
  //uselayouteffect
  // let width
  // useLayoutEffect(() => {
  //   width = window.innerWidth
  // }, [])
  let { width } = useWindow()
  if (!width) return null

  n = Math.floor(width / (iw + gap))

  rows = Array(n).fill(0)

  function getPos(p: Post<any>) {
    let minI = rows.indexOf(Math.min.apply(null, rows))
    let h = rows[minI]
    rows[minI] += iw / p.media.ratio + gap
    return {
      left: minI * iw + gap * minI,
      top: h,
    }
  }

  return (
    // style={{ border: "1px solid red", width: "99vw", height: "5440rem" }}
    <div>
      {/* <div className="slidecontainer">
        <p>Zoom in/out :</p>
        <input
          type="range"
          min="200"
          max="800"
          step="50"
          value={iw}
          onChange={(e) => {
            setIw(Number(e.target.value))
          }}
        />
      </div> */}
      <div
        className={styles.masonry}
        style={{
          // border: "1px solid red",
          marginLeft: (width - (iw + gap) * n + gap) / 2,
          // width: "99vw",
          marginTop: "3rem",
          // border: "1px solid white",
        }}
      >
        {posts?.map((p, i) => (
          <Brick
            key={i}
            post={p}
            width={iw}
            height={iw / p.media.ratio}
            position={getPos(p)}
            onClick={() => onBrickClick(i)}
            lastBrick={i === posts.length - 1 ? lastBrick : null}
          />
        ))}
      </div>
      {end && (
        <h1
          style={{ zIndex: 4, position: "fixed", bottom: "10px", left: "3px" }}
        >
          =========That's All folks=========
        </h1>
      )}
    </div>
  )
}
export default Masonry
