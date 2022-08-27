import styles from "../styles/infos.module.css"
import { useRouter } from "next/router"
import { Infos as InfosType } from "../schema/post"
import { FaRegClock, FaRegComment } from "react-icons/fa"
import format from "../utils/format"

type props = {
  infos: InfosType
  onMouseEnter?: Function
  onWheel?: Function
  tag?: string
  shade: boolean
}

type Units = {
  [key in Intl.RelativeTimeFormatUnit]?: number
  //   [key in "year" | "month" | "day" | "hour" | "minute" | "second"]?: number
}

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

function Infos({
  infos: { ups, title, permalink, sub, author, date, comments, awards },
  onMouseEnter = () => {},
  onWheel = () => {},
  tag,
  shade,
}: props) {
  const router = useRouter()

  function link(l: string) {
    return (
      <span
        className={styles.link}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          router.push(l)
          document.body.style.overflow = "auto"
        }}
        onContextMenu={(e) => e.stopPropagation()}
      >
        <b style={{ color: "var(--sorbe)" }}>{l.substr(1, 2)}</b>
        {l.substr(3)}
      </span>
    )
  }

  return (
    <div
      className={`${styles.infos} ${shade && styles.shade}`}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseMove={(e) => e.stopPropagation()}
      onWheel={() => onWheel()}
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
        {tag !== "subreddit" && <a href={`/r/${sub}`}>{link(`/r/${sub}`)}</a>}
        <span className={styles.stat}>
          <FaRegComment />
          {format(comments)}
        </span>
        <span className={styles.stat}>
          <FaRegClock />
          {relativeTime(date)}
        </span>
        {tag !== "user" && <a href={`/u/${author}`}>{link(`/u/${author}`)}</a>}
      </div>
      <div className={styles.awards}>
        {awards.map((a) => (
          <span className={styles.award}>
            <img src={a.icon} width={20} height={20} alt="" />
            <b> {a.count === 1 ? "" : a.count}</b>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Infos
