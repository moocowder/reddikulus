import { useEffect, useState } from "react"
import styles from "../styles/panel.module.css"
import Link from "next/link"
import { FaTimes, FaPlay } from "react-icons/fa"
import { useRouter } from "next/router"

interface Props {
  topic: string | null
  setTopic: Function
  setOpen: Function
}

function Panel({ topic, setTopic, setOpen }: Props) {
  const [topics, setTopics] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch("/api/topics")
      .then((r) => r.json())
      .then((d) => setTopics(d))
      .catch((e) => console.log(e))
  }, [])

  function handleItemClick(e: any, url: string) {
    e.preventDefault()
    router.push(url)
    setOpen(false)
  }

  return (
    <ul className={styles.panel}>
      {topics?.map((t) => (
        <li
          className={styles.item}
          key={t}
          style={{ backgroundColor: t === topic ? "#1c002f" : "" }}
        >
          <a
            href={"/topics/" + t}
            className={styles.link}
            onClick={(e) => handleItemClick(e, t)}
          >
            <div className={styles.wrapper}>
              <img src="/boo.jpg" alt="" />
            </div>
            <div className={styles.text}>{t}</div>
          </a>
          <div
            className={styles.arrow}
            onMouseEnter={() => setTopic(t)}
            style={{ color: t === topic ? "var(--sorbe)" : "" }}
          >
            <FaPlay />
          </div>
        </li>
      ))}
    </ul>
  )
}
export default Panel
