import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "../styles/menu.module.css"
import { FaTimes, FaPlay } from "react-icons/fa"
import { MdPlayArrow } from "react-icons/md"
import Subpanel from "./subpanel"
import { useRef } from "react"
import useEventListener from "../hooks/useEventListener"
import Panel from "./panel"

function Menu({ setOpen }: { setOpen: Function }) {
  const [topic, setTopic] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false)
  })

  useEventListener("click", (e: any) => {
    if (ref.current == null || ref.current.contains(e.target)) return
    setOpen(false)
  })

  return (
    <div ref={ref} className={styles.menu}>
      <Panel topic={topic} setTopic={setTopic} setOpen={setOpen} />
      {topic && <Subpanel topic={topic} setOpen={setOpen} />}
    </div>
  )
}

export default Menu
