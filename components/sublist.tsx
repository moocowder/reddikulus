import { useCallback, useEffect, useRef, useState, useContext } from "react"
import axios from "axios"
import Badge from "../components/badge"
import styles from "../styles/sublist.module.css"
import useLoadSubs from "../hooks/useLoadSubs"
import format from "../utils/format"
import Link from "next/link"

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
        {data?.subs.map((s) => (
          <li key={s.name} className={styles.sub}>
            {s.icon ? (
              <div className={styles.wrapper}>
                <img src={s.icon} alt="" />
              </div>
            ) : (
              <p>hi</p>
              // <Badge
              //   side={50}
              //   color={
              //     "#ff0066"
              //     // s.primary_color || s.key_color || s.banner_background_color
              //   }
              //   text={s.name}
              // />
            )}
            <Link href={`/r/${s.name}`}>
              <div className={styles.infos}>
                <b>{s.name}</b>
                <p>{format(s.subscribers)}</p>
              </div>
            </Link>
          </li>
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
