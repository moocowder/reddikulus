import styles from "../styles/panel.module.css"
import { FaPlay } from "react-icons/fa"
import { useRouter } from "next/router"

interface Props {
  selected: string | null
  setSelected: Function
  setOpen: Function
}

function Panel({ selected, setSelected, setOpen }: Props) {
  const router = useRouter()

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
          style={{ backgroundColor: t === selected ? "#05061b" : "" }}
        >
          <a
            className={styles.link}
            href={"/category/" + t}
            onClick={(e) => handleItemClick(e, "/category/" + t)}
          >
            <div className={styles.wrapper}>
              <img src={`/category/${t}.jpg`} alt="" />
            </div>
            <div className={styles.text}>{t}</div>
          </a>
          <div
            className={styles.arrow}
            onClick={() => setSelected(t)}
            style={{ color: t === selected ? "var(--sorbe)" : "" }}
          >
            <FaPlay />
          </div>
        </li>
      ))}
    </ul>
  )
}

const topics = [
  "aww",
  "food",
  "memes",
  "tech",
  "crypto",
  "gaming",
  "e3",
  "sports",
  "health and fitness",
  "outdoors",
  "travel",
  "vroom",
  "pics and gifs",
  "art and design",
  "photography",
  "music",
  "wholesome",
  "mindblowing",
  "science",
  "finance and business",
  "tv",
  "videos",
  "beauty",
  "fashion",
]

export default Panel
