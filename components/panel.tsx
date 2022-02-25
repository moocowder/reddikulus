import { useEffect, useState } from "react"
import styles from "../styles/panel.module.css"
import Link from "next/link"
import { FaTimes, FaPlay } from "react-icons/fa"
import { useRouter } from "next/router"

interface Props {
  // list: { name: string; icon: string }[]
  // topic: Topic | null
  // setTopic: Function
  selected: string | null
  setSelected: Function
  setOpen: Function
}

// type Topic = { name: string; icon: string }
// type Sub = { name: string; icon: string }

function Panel({ selected, setSelected, setOpen }: Props) {
  const router = useRouter()

  function handleItemClick(e: any, url: string) {
    e.preventDefault()
    router.push(url)
    setOpen(false)
  }

  return (
    <ul className={styles.panel}>
      {topics?.map((l) => (
        <li
          className={styles.item}
          key={l.name}
          style={{ backgroundColor: l.name === selected ? "#05061b" : "" }}
        >
          <a
            className={styles.link}
            href={"/topics/" + l.name}
            onClick={(e) => handleItemClick(e, "/topics/" + l.name)}
          >
            <div className={styles.wrapper}>
              <img src={"/category/" + l.icon} alt="" />
            </div>
            <div className={styles.text}>{l.name}</div>
          </a>
          <div
            className={styles.arrow}
            // onMouseEnter={() => setSelected(l.name)}
            onClick={() => setSelected(l.name)}
            style={{ color: l.name === selected ? "var(--sorbe)" : "" }}
          >
            <FaPlay />
          </div>
        </li>
      ))}
    </ul>
  )
}
const topics = [
  {
    name: "aww",
    icon: "aww.png",
  },
  {
    name: "food",
    icon: "food.png",
  },
  {
    name: "memes",
    icon: "memes.jpg",
  },
  {
    name: "tech",
    icon: "tech.png",
  },
  {
    name: "crypto",
    icon: "crypto.png",
  },
  {
    name: "gaming",
    icon: "gaming.png",
  },
  {
    name: "e3",
    icon: "e3.png",
  },
  {
    name: "sports",
    icon: "sports.jpg",
  },
  {
    name: "health and fitness",
    icon: "health.jpg",
  },
  {
    name: "outdoors",
    icon: "outdoors.png",
  },
  {
    name: "travel",
    icon: "travel.png",
  },
  {
    name: "vroom",
    icon: "vroom.jpg",
  },
  {
    name: "pics & gifs",
    icon: "pics.jpg",
  },
  {
    name: "art and deseign",
    icon: "art.png",
  },
  {
    name: "photography",
    icon: "photography.jpg",
  },
  {
    name: "music",
    icon: "music.png",
  },
  {
    name: "wholesome",
    icon: "wholesome.png",
  },
  {
    name: "mindblowing",
    icon: "mindblowing.jpg",
  },
  {
    name: "science",
    icon: "",
  },
  {
    name: "finance and buisiness",
    icon: "finance.jpg",
  },
  {
    name: "tv",
    icon: "tv.jpg",
  },
  {
    name: "videos",
    icon: "videos.jpg",
  },
  {
    name: "beauty",
    icon: "beauty.jpg",
  },
  {
    name: "fashion",
    icon: "",
  },
]

export default Panel
