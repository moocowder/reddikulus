import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "../styles/subpanel.module.css"

type Sub = {
  name: string
  icon: string
}
function Subpanel({ topic, setTopic }: { topic: string; setTopic: Function }) {
  const [subs, setSubs] = useState<Sub[]>([])
  const [page, setPage] = useState(0)
  const size = 10

  useEffect(() => {
    setPage(0)
    fetch(`/api/topicSubs?topic=${topic}&&page=${page}&&size=${size}`)
      .then((r) => r.json())
      .then((d) => setSubs(d))
      .catch((e) => console.log(e))
  }, [topic])

  useEffect(() => {
    if (page === 0) return
    fetch(`/api/topicSubs?topic=${topic}&&page=${page}&&size=${size}`)
      .then((r) => r.json())
      .then((d) => setSubs([...subs, ...d]))
      .catch((e) => console.log(e))
  }, [page])

  return (
    <ul
      className={styles.subpanel}
      onWheel={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {subs?.map((s) => (
        <li className={styles.item} key={s.name}>
          <img src={s.icon} alt="" />
          <Link href={"/r/" + s.name}>{s.name}</Link>
        </li>
      ))}
      <button onClick={() => setPage(page + 1)}>more</button>
    </ul>
  )
}

export default Subpanel
