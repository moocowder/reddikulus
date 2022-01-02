import { useCallback, useEffect, useRef, useState, useContext } from "react"
import axios from "axios"
import Badge from "../components/badge"
import styles from "../styles/sublist.module.css"
import useLoadSubs from "../hooks/useLoadSubs"
import format from "../utils/format"
import Link from "next/link"
import router from "next/router"

interface Props {
  query: string
}

function Sublist({ query }: Props) {
  // const [subs, setSubs] = useState<Sub[]>([])
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
            {s.icon ? (
              <div className={styles.wrapper}>
                <img src={s.icon} alt="" />
              </div>
            ) : (
              <Badge side={50} color={s.color} text={s.name} />
            )}
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
        <button className={styles.more} onClick={() => setAfter(data.after)}>
          see more
        </button>
      )}
    </div>
  )
}
export default Sublist
