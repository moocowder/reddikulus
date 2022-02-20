import { useEffect, useState } from "react"
import styles from "../styles/panel.module.css"
import Link from "next/link"
import { FaTimes, FaPlay } from "react-icons/fa"
import { useRouter } from "next/router"

interface Props {
  list: { name: string; icon: string }[]
  // topic: Topic | null
  // setTopic: Function
  selected: string | null
  setSelected: Function
  setOpen: Function
}

// type Topic = { name: string; icon: string }
// type Sub = { name: string; icon: string }

function Panel({ list, selected, setSelected, setOpen }: Props) {
  const router = useRouter()

  function handleItemClick(e: any, url: string) {
    e.preventDefault()
    router.push(url)
    setOpen(false)
  }

  return (
    <ul className={styles.panel}>
      {list?.map((l) => (
        <li
          className={styles.item}
          key={l.name}
          style={{ backgroundColor: l.name === selected ? "#1c002f" : "" }}
        >
          <a
            className={styles.link}
            href={"/topics/" + l.name}
            onClick={(e) => handleItemClick(e, "/topics/" + l.name)}
          >
            <div className={styles.wrapper}>
              <img src={l.icon || ""} alt="" />
            </div>
            <div className={styles.text}>{l.name}</div>
          </a>
          <div
            className={styles.arrow}
            onMouseEnter={() => setSelected(l.name)}
            style={{ color: l.name === selected ? "var(--sorbe)" : "" }}
          >
            <FaPlay />
          </div>
        </li>
      ))}
    </ul>
  )
}
export default Panel
