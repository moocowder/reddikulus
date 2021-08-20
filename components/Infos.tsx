import { ImArrowUp } from "react-icons/im"
import Link from "next/link"
import styles from "../styles/infos.module.css"

type props = {
  ups: number
  title: string
  permalink: string
  sub?: string
  author?: string
  comments: number
  date: number
}

type Units = {
  [key in Intl.RelativeTimeFormatUnit]?: number
  //   [key in "year" | "month" | "day" | "hour" | "minute" | "second"]?: number
}

function Infos({ ups, title, permalink, sub, author, comments, date }: props) {
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
    <div className={styles.infos}>
      <div>
        <ImArrowUp />
        <b className={styles.ups}>{format(ups)}</b>
        <a
          href={"https://reddit.com" + permalink}
          target="_blank"
          className={styles.title}
        >
          {title}
        </a>
      </div>
      <div>
        <Link href={`/r/${sub}`}>
          <a> r/{sub}</a>
        </Link>{" "}
        |
        <Link href={`/u/${author}`}>
          <a className={styles.author}> u/{author}</a>
        </Link>
        <span>{relativeTime(date)}</span> |
        <span>{format(comments)} comments</span> |
      </div>
    </div>
  )
}

export default Infos
