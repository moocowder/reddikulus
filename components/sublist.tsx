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
              <img style={{ width: "50px" }} src={s.icon} alt="" />
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
            <div className={styles.infos}>
              <p>
                <Link href={`/r/${s.name}`}>{s.name}</Link>
              </p>
              <p>{format(s.subscribers)}</p>
            </div>
          </li>
        ))}
        {loading &&
          Array.from(Array(8).keys()).map((i: number) => (
            <li key={i} className={styles.mock}>
              <img
                style={{ width: "50px" }}
                src="https://styles.redditmedia.com/t5_2qoih/styles/communityIcon_03md6wdoo3g31.png"
                alt=""
              />
              <div>
                <p>name</p>
                <p>subs</p>
              </div>
            </li>
          ))}
      </ul>
      {data.after && (
        <button style={{ margin: "auto" }} onClick={() => setAfter(data.after)}>
          see more
        </button>
      )}
    </div>
  )
}
export default Sublist
