import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "../styles/menu.module.css"
import { FaTimes, FaPlay } from "react-icons/fa"
import { MdPlayArrow } from "react-icons/md"
import Subpanel from "./subpanel"
import { useRef } from "react"
import useEventListener from "../hooks/useEventListener"
import Panel from "./panel"

type Entry = {
  topic: string
  subs: [{ name: string; icon: string }]
}

function Menu({ setOpen }: { setOpen: Function }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [topics, setTopics] = useState<string[]>([])
  const [topic, setTopic] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false)
  })

  useEventListener("click", (e: any) => {
    if (ref.current == null || ref.current.contains(e.target)) return
    setOpen(false)
  })

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/maathi/topics/master/data.json")
      .then((r) => r.json())
      .then((d) => setEntries(d))
      .catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    if (!entries) return
    setTopics(entries.map((d) => d.topic))
  }, [entries])

  return (
    <div ref={ref} className={styles.menu}>
      <Panel
        topics={topics}
        topic={topic}
        setTopic={setTopic}
        setOpen={setOpen}
      />
      {topic && (
        <Subpanel
          key={topic}
          subs={entries.find((e) => e.topic === topic)?.subs || []}
          setOpen={setOpen}
        />
      )}
    </div>
  )
}

export default Menu
