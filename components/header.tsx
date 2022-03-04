import Autocomplete from "./autocomplete"
import styles from "../styles/header.module.css"
import Link from "next/link"
import { HiTrendingUp } from "react-icons/hi"
import { FaReddit, FaHeart } from "react-icons/fa"
import { useRouter } from "next/router"

function Header({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (o: boolean) => void
}) {
  const router = useRouter()

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <span onClick={() => setOpen(!open)} className={styles.icon}>
          <HiTrendingUp />
        </span>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            router.push(`/`)
          }}
        >
          <img src="/logo.png" alt="" />
        </a>
      </div>

      <div className={styles.right}>
        <Autocomplete />
        <div className={styles.icons}>
          <a
            className={styles.icon}
            href="https://www.reddit.com/r/axorsium"
            target="_blank"
          >
            <FaReddit />
          </a>
          <span className={styles.icon} onClick={() => router.push("/donate")}>
            <FaHeart />
          </span>
        </div>
      </div>
    </div>
  )
}
export default Header
