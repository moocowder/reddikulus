import { useState } from "react"
import Badge from "../components/badge"
import styles from "../styles/sublist.module.css"
import useLoadSubs from "../hooks/useLoadSubs"
import format from "../utils/format"
import router from "next/router"
import { IoIosArrowDown } from "react-icons/io"

interface Props {
  query: string
}

function Sublist({ query }: Props) {
  const [after, setAfter] = useState("")
  const { data, loading, error } = useLoadSubs(query, after)

  return (
    <div className={styles.sublist}>
      <ul className={styles.list}>
        {data?.subs?.map((s) => (
          <a
            href={`/r/${s.name}`}
            key={s.name}
            className={styles.sub}
            onClick={(e) => {
              e.preventDefault()
              router.push(`/r/${s.name}`)
            }}
          >
            <div className={styles.wrapper}>
              {s.icon ? <img src={s.icon} alt="" /> : <Badge color={s.color} />}
            </div>
            <div className={styles.infos}>
              <p>{s.name}</p>
              <small>{format(s.subscribers)}</small>
            </div>
          </a>
        ))}
        {loading &&
          Array.from(Array(12).keys()).map((i: number) => (
            <li key={i} className={styles.sub}>
              <div className={styles.circle}></div>
              <div className={styles.rectangles}>
                <div></div>
                <div></div>
              </div>
            </li>
          ))}
      </ul>
      {data.after && (
        <span className={styles.more} onClick={() => setAfter(data.after)}>
          <IoIosArrowDown />
        </span>
      )}
    </div>
  )
}
export default Sublist
