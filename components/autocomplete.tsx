import { useRouter } from "next/router"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import Link from "next/link"
import styles from "../styles/autocomplete.module.css"
import UserContext from "../contexts/userContext"
import { FaSearch } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"
import { BsArrowReturnLeft } from "react-icons/bs"
import { GrReturn } from "react-icons/gr"
import { IoMdReturnLeft } from "react-icons/io"
import { AiOutlineEnter } from "react-icons/ai"
import Badge from "./badge"

type Sub = {
  name: string
  icon: string
  community_icon: string
  numSubscribers: string
}

function Autocomplete() {
  const [user, setUser] = useContext(UserContext)
  let [query, setQuery] = useState("")
  let [subs, setSubs] = useState<Sub[]>([])
  const router = useRouter()

  useEffect(() => {
    let cancel: any
    axios({
      method: "GET",
      url: `https://www.reddit.com/api/subreddit_autocomplete.json`,
      params: { query, include_over_18: user?.nsfw },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((r) => {
        r.data.subreddits = r.data.subreddits.map((s: any) => {
          if (s.name.substr(0, 2) === "u_") {
            s.name = s.name.replace(/^u_/, "u/")
          } else {
            s.name = "r/" + s.name
          }
          return s
        })
        console.log(r.data.subreddits)
        setSubs(r.data.subreddits)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        console.log("erreur : ", e)
      })
    return () => cancel()
  }, [query])

  return (
    <div className={styles.container}>
      <div>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          placeholder="search for anything"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setQuery("")
              router.push(`/search?q=${query}`)
            }
          }}
          type="text"
        />
        <IoMdReturnLeft
          style={{
            position: "absolute",
            left: "30px",
            top: "20px",
            color: "var(--sorbe)",
            opacity: query ? 1 : 0,
          }}
        />

        <BiSearch
          style={{
            position: "absolute",
            left: "30px",
            // color: "grey",
            opacity: query ? 0 : 1,
          }}
        />
      </div>
      <ul className={styles.list}>
        {subs?.map((s: any) => (
          <li
            key={s.name}
            className={styles.item}
            onClick={() => {
              setQuery("")
              router.push(`/${s.name}`)
            }}
          >
            <img src={s.communityIcon || s.icon} alt="" />
            {!s.communityIcon && !s.icon && (
              <Badge side={50} text={s.name} color="#ff0000" />
            )}
            <div className={styles.infos}>
              <span>{s.name}</span>
              <b>{s.numSubscribers}</b>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Autocomplete
