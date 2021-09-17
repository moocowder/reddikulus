import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "../styles/panel.module.css"
import { FaTimes } from "react-icons/fa"
import { MdPlayArrow } from "react-icons/md"
import Subpanel from "./subpanel"

function Panel({ setOpen }: { setOpen: Function }) {
  const [topics, setTopics] = useState<string[]>([])
  const [topic, setTopic] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/topics?topic=")
      .then((r) => r.json())
      .then((d) => setTopics(d))
      .catch((e) => console.log(e))
  }, [])

  return (
    <div className={styles.menu} onMouseLeave={() => {}}>
      <ul className={styles.panel}>
        <li>
          <FaTimes onClick={() => setOpen(false)} />
        </li>
        {topics?.map((t) => (
          <li className={styles.item} key={t}>
            <Link href={"/topics/" + t}>{t}</Link>
            <MdPlayArrow onMouseEnter={() => setTopic(t)} />
          </li>
        ))}
      </ul>
      {topic && <Subpanel topic={topic} setTopic={setTopic} />}
    </div>
  )
}

export default Panel
