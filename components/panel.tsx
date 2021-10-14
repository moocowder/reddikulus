import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "../styles/panel.module.css"
import { FaTimes, FaPlay } from "react-icons/fa"
import { MdPlayArrow } from "react-icons/md"
import Subpanel from "./subpanel"
import { useRef } from "react"
import useEventListener from "../hooks/useEventListener"

function Panel({ setOpen }: { setOpen: Function }) {
  const [topics, setTopics] = useState<string[]>([])
  const [topic, setTopic] = useState<string | null>(null)

  const ref = useRef<HTMLDivElement>(null)

  useEventListener(
    "click",
    (e: any) => {
      if (ref.current == null || ref.current.contains(e.target)) return
      // cb(e)
      setOpen(false)
    }
    // document
  )
  useEffect(() => {
    fetch("/api/topics?topic=")
      .then((r) => r.json())
      .then((d) => setTopics(d))
      .catch((e) => console.log(e))
  }, [])

  return (
    <div
      ref={ref}
      className={styles.menu}
      onMouseLeave={() => {
        // setOpen(false)
      }}
    >
      <ul className={styles.panel}>
        {topics?.map((t) => (
          <li
            className={styles.item}
            key={t}
            style={{ backgroundColor: t === topic ? "#1c002f" : "" }}
          >
            <Link href={"/topics/" + t}>
              <div className="topic" onClick={() => setOpen(false)}>
                <div>
                  <img src="/boo.jpg" alt="" />
                </div>
                <div>{t}</div>
              </div>
            </Link>
            <div
              className="arrow"
              onMouseEnter={() => setTopic(t)}
              style={{ color: t === topic ? "var(--sorbe)" : "" }}
            >
              <FaPlay />
            </div>
            {/* <Link href={"/topics/" + t}>{t}</Link> */}
          </li>
        ))}
      </ul>
      {topic && (
        <Subpanel topic={topic} setTopic={setTopic} setOpen={setOpen} />
      )}
    </div>
  )
}

export default Panel
