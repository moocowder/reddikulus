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
import useWindowSize from "../hooks/useWindowSize"
import useEventListener from "../hooks/useEventListener"
import { FaArrowUp, FaPlus, FaMinus } from "react-icons/fa"

let n

type Props = {
  posts: Post<any>[]
  onBrickClick: (i: number) => void
  loadMore: () => void
  loading: boolean
  hasMore: string
  setInfos: Function
  children: any
}

function Masonry({
  posts,
  onBrickClick,
  loadMore,
  loading,
  hasMore,
  setInfos,
  children,
}: Props) {
  // const [selected, setSelected] = useState<Post<any> | null>()
  const { width, height } = useWindowSize()
  const [contentHeight, setContentHeight] = useState(100)
  // const width = useWindow()
  console.log("renderring masonry")
  let rows: number[] = []
  const gap = 30
  let [iw, setIw] = useState(300)
  const [end, setEnd] = useState(false)
  const [ch, setCh] = useState(0)
  // const iw = 350

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      e.preventDefault()
      console.log("resize...", e)
    })
  }, [])

  useEffect(() => {
    setEnd(false)
  }, [posts])

  function lastBrick() {
    if (loading) return
    if (hasMore) loadMore()
    else setEnd(true)
  }
  //uselayouteffect
  // let width
  // useLayoutEffect(() => {
  //   width = window.innerWidth
  // }, [])
  // let { width } = useWindow()
  if (!width) return null

  n = Math.floor(width / (iw + gap))

  rows = Array(n).fill(0)

  function getPos(ratio: number) {
    let minI = rows.indexOf(Math.min.apply(null, rows))

    let h = rows[minI]
    rows[minI] += iw / ratio + gap

    // if (rows[minI] > rows.indexOf(Math.max.apply(null, rows))) setCh(rows[minI])

    return {
      left: minI * iw + gap * minI,
      top: h,
    }
  }

  function maxHeight() {
    setContentHeight(Math.max.apply(null, rows))
  }

  //get width
  //calculate n , setN(5)
  //getpost : x=  , y=minH  , update minh setminH()
  return (
    <div>
      {children}
      <div
        className={styles.masonry}
        style={{
          // border: "1px solid red",
          height: contentHeight,
          marginLeft: (width - (iw + gap) * n + gap) / 2,
          // width: "99vw",
          marginTop: "50px",
          marginBottom: "100px",
          // border: "1px solid white",
        }}
      >
        {posts?.map((p, i) => (
          <Brick
            key={i}
            post={p}
            // setSelected={setSelected}
            setInfos={setInfos}
            width={iw}
            height={iw / p.media.ratio}
            position={getPos(p.media.ratio)}
            onClick={() => onBrickClick(i)}
            lastBrick={i === posts.length - 1 ? lastBrick : null}
            maxHeight={maxHeight}
          />
        ))}
      </div>
      <div className={styles.menu}>
        <span
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <FaArrowUp />
        </span>
        <span onClick={() => setIw(iw + 20)}>
          <FaPlus />
        </span>
        <span onClick={() => setIw(iw - 20)}>
          <FaMinus />
        </span>
      </div>
    </div>
  )
}
export default Masonry
