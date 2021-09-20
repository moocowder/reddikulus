import { ImArrowUp } from "react-icons/im"
import Link from "next/link"
import styles from "../styles/infos.module.css"
import { BsFillChatDotsFill } from "react-icons/bs"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import { FiMessageSquare } from "react-icons/fi"
import { FaRegClock } from "react-icons/fa"
import { IoLogoReddit } from "react-icons/io"

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
}: // onMouseEnter,
props) {
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

  function format(number: number) {
    if (number <= 999) return number
    return (Math.round(number / 100) / 10).toFixed(1) + " k"
  }

  return (
    <div
      className={styles.infos}
      style={{ display: opacity === 1 ? "block" : "none" }}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseMove={(e) => e.stopPropagation()}
    >
      <div className={styles.top}>
        <div className={styles.stat}>
          <ImArrowUp />
          {format(ups)}
        </div>
        <a
          href={"https://reddit.com" + permalink}
          target="_blank"
          className={styles.title}
        >
          <b>{title}</b>
        </a>
      </div>
      <div className={styles.top}>
        {page !== "/r" && (
          <>
            <img style={{ width: "50px" }} src={img} alt="" />
            <Link href={`/r/${sub}`}>
              <a> r/{sub}</a>
            </Link>
          </>
        )}
        {page !== "/u" && (
          <div className={styles.stat}>
            <IoLogoReddit />
            <Link href={`/u/${author}`}>
              <a className={styles.author}> u/{author}</a>
            </Link>
          </div>
        )}
        <span className={styles.stat}>
          <FaRegClock />
          {relativeTime(date)}
        </span>
        <span className={styles.stat}>
          <FiMessageSquare />
          {format(comments)}
        </span>
      </div>
    </div>
  )
}

export default Infos
