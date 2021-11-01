import { ImArrowUp } from "react-icons/im"
import Link from "next/link"
import styles from "../styles/infos.module.css"
import { BsFillChatDotsFill } from "react-icons/bs"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import { FiMessageSquare } from "react-icons/fi"
import {
  FaRegClock,
  FaRegCommentAlt,
  FaRegComment,
  FaComment,
} from "react-icons/fa"
import { IoLogoReddit } from "react-icons/io"
import { FaRegUser } from "react-icons/fa"
import format from "../utils/format"

type props = {
  ups: number
  title: string
  permalink: string
  sub?: string
  author?: string
  comments: number
  date: number
  opacity: number
  onMouseEnter?: Function
}

type Units = {
  [key in Intl.RelativeTimeFormatUnit]?: number
  //   [key in "year" | "month" | "day" | "hour" | "minute" | "second"]?: number
}

function Infos({
  ups,
  title,
  permalink,
  sub,
  author,
  comments,
  date,
  opacity,
  onMouseEnter = () => {},
}: props) {
  const router = useRouter()
  const [page, setPage] = useState<"/r" | "/u" | "">("")
  const [img, setImg] = useState("")

  // useEffect(() => {
  //   let p = router.pathname.substr(0, 2)
  //   if (p !== "/r") {
  //     fetch(`/api/icon?sub=` + sub)
  //       .then((r) => r.json())
  //       .then((d) => setImg(d.img))
  //   }
  //   if (p === "/r" || p === "/u") setPage(p)
  // }, [])

  function relativeTime(d1: number, d2 = +new Date()) {
    d2 = Number(d2.toString().substr(0, 10))

    // in seconds
    let units: Units = {
      year: 24 * 60 * 60 * 365,
      month: (24 * 60 * 60 * 365) / 12,
      day: 24 * 60 * 60,
      hour: 60 * 60,
      minute: 60,
      second: 1,
    }

    let rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

    let elapsed: number = d2 - d1

    let u: Intl.RelativeTimeFormatUnit

    for (u in units)
      if (elapsed > (units[u] || 0) || u == "second")
        return rtf.format(Math.round(-elapsed / (units[u] || 0)), u)
  }

  function handleMouseDown(e: any, link: string) {
    e.stopPropagation()
    if (e.button === 0) {
      e.preventDefault()
      router.push(link)
    }
  }

  return (
    <div
      className={styles.infos}
      style={{ display: opacity === 1 ? "block" : "none" }}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseMove={(e) => e.stopPropagation()}
    >
      <div className={styles.top}>
        <a
          href={"https://reddit.com" + permalink}
          target="_blank"
          className={styles.title}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.stopPropagation()}
        >
          {<span className={styles.ups}>{format(ups)}</span>}
          {title}
        </a>
      </div>
      <div className={styles.bottom}>
        {page !== "/r" && (
          <>
            <a href={`/r/${sub}`}>
              <span
                className={styles.link}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  router.push(`/r/${sub}`)
                }}
                onContextMenu={(e) => e.stopPropagation()}
              >
                <span style={{ color: "var(--sorbe)" }}>r/</span>
                {sub}
              </span>
            </a>
          </>
        )}
        <span className={styles.stat}>
          <FaRegComment />
          {format(comments)}
        </span>
        <span className={styles.stat}>
          <FaRegClock />
          {relativeTime(date)}
        </span>
        {page !== "/u" && (
          <div className={styles.stat}>
            <a href={`/u/${author}`}>
              <span
                className={styles.link}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  router.push(`/u/${author}`)
                }}
                onContextMenu={(e) => e.stopPropagation()}
              >
                <span style={{ color: "var(--sorbe)" }}>u/</span>
                {author}
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Infos
