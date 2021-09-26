import { useCallback, useEffect, useRef, useState, useContext } from "react"
import axios from "axios"
import Badge from "../components/badge"
import styles from "../styles/sublist.module.css"

interface Props {
  query: string
}

type Sub = {
  display_name: string
  header_img: string
  icon: string
  // public_description: string
  primary_color: string
  key_color: string
  subscribers: number
  banner_background_color: string
}

function Sublist({ query }: Props) {
  const [subs, setSubs] = useState<Sub[]>([])

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://www.reddit.com/subreddits/search.json`,
      params: { q: query, include_over_18: "on", limit: 12 },
    })
      .then((r) => {
        let poo = r.data.data.children.map((c: any) => {
          return {
            display_name: c.data.display_name,
            // header_img: string,
            // public_description: string
            icon: c.data.community_icon.replace(/\?.*/, "") || c.data.icon_img,
            subscribers: c.data.subscribers,
            primary_color: c.data.primary_color,
            key_color: c.data.key_color,
            banner_background_color: c.data.banner_background_color,
          }
        })
        console.log(poo)
        setSubs(poo)
      })
      .catch((e) => {
        console.log("erreur : ", e)
      })
  }, [query])

  return (
    <ul className={styles.sublist}>
      {subs.map((s) => (
        <li className={styles.sub}>
          {s.icon ? (
            <img style={{ width: "50px" }} src={s.icon} alt="" />
          ) : (
            <Badge
              side={50}
              color={
                s.primary_color || s.key_color || s.banner_background_color
              }
              text={s.display_name}
            />
          )}
          <div className={styles.infos}>
            <p>{s.display_name}</p>
            <p>{s.subscribers}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
export default Sublist
