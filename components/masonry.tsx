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

let n

type Props = {
  posts: Post<any>[]
  onBrickClick: (i: number) => void
  loadMore: () => void
  loading: boolean
  hasMore: string
}

function Masonry({ posts, onBrickClick, loadMore, loading, hasMore }: Props) {
  const [selected, setSelected] = useState<Post<any> | null>()
  // const { width, height } = useWindowSize()
  // const width = useWindow()
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
    <div>
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
        {selected && (
          <Infos
            opacity={1}
            ups={selected.ups}
            title={selected.title}
            permalink={selected.permalink}
            sub={selected.sub}
            author={selected.author}
            comments={selected.comments}
            date={selected.date}
          />
        )}
        {posts?.map((p, i) => (
          <Brick
            key={i}
            post={p}
            setSelected={setSelected}
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
