import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "../styles/panel.module.css"
import { FaTimes } from "react-icons/fa"

function Panel({ setOpen }: { setOpen: Function }) {
  const [topics, setTopics] = useState<string[]>([])
  useEffect(() => {
    fetch("/api/topics?topic=")
      .then((r) => r.json())
      .then((d) => setTopics(d))
      .catch((e) => console.log(e))
  }, [])

  return (
    <ul className={styles.panel}>
      <li>
        <FaTimes onClick={() => setOpen(false)} />
      </li>
      {topics?.map((t) => (
        <li key={t}>
          <Link href={"/topics/" + t}>{t}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Panel
