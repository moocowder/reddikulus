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
import format from "../utils/format"

type Sub = {
  name: string
  icon: string
  community_icon: string
  numSubscribers: string
}
interface Item {
  name: string
  icon: string
  communityIcon?: string
  numSubscribers?: number
  media: boolean
  primaryColor: string
}

function Autocomplete() {
  const router = useRouter()
  const [user, setUser] = useContext(UserContext)
  let [query, setQuery] = useState("")
  const [opacity, setOpacity] = useState<1 | 0>(0)
  let [subs, setSubs] = useState<Item[]>([])
  let [users, setUsers] = useState<Item[]>([])
  let us: Item[] = []
  let ss: Item[] = []

  const url = "https://www.reddit.com/api/subreddit_autocomplete.json"

  useEffect(() => {
    let cancel: any
    axios({
      method: "GET",
      url,
      params: { query, include_over_18: user?.nsfw, raw_json: 1 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((r) => {
        r.data.subreddits.map((s: any) => {
          if (s.name.substr(0, 2) === "u_") {
            s.name = s.name.replace(/^u_/, "u/")
            s.numSubscribers = null
            us.push(s)
          } else {
            s.name = "r/" + s.name
            ss.push(s)
          }
        })
        // console.log(r.data.subreddits)
        // setSubs(r.data.subreddits)
        // setItems([...subs, ...users])
        setUsers(us)
        setSubs(ss)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        console.log("erreur : ", e)
      })
    return () => cancel()
  }, [query])

  return (
    <div className={styles.container}>
      <div style={{ position: "relative" }}>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          onFocus={() => setOpacity(1)}
          onBlur={() => setOpacity(0)}
          placeholder="search for anything..."
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
            left: "10px",
            top: "10px",
            color: "var(--sorbe)",
            opacity: query ? 1 : 0,
          }}
        />

        <BiSearch
          style={{
            position: "absolute",
            left: "10px",
            top: "8px",
            // color: "grey",
            opacity: query ? 0 : 1,
          }}
        />
      </div>
      <ul className={styles.list} style={{ opacity }}>
        {subs?.map((i) => (
          <li
            key={i.name}
            className={styles.item}
            onClick={() => {
              setQuery("")
              router.push(`/${i.name}`)
            }}
          >
            {i.communityIcon || i.icon ? (
              <div className={styles.wrapper}>
                <img src={i.communityIcon || i.icon} alt="" />
              </div>
            ) : (
              <Badge side={50} text={i.name} color={i.primaryColor} />
            )}
            <div className={styles.infos}>
              <b>{i.name}</b>
              {i.numSubscribers && <span>{format(i.numSubscribers)}</span>}
            </div>
          </li>
        ))}
        {subs?.length !== 0 && users.length !== 0 && (
          <li className={styles.separator}></li>
        )}
        {users?.map((u) => (
          <li
            key={u.name}
            className={styles.item}
            onClick={() => {
              setQuery("")
              router.push(`/${u.name}`)
            }}
          >
            {u.communityIcon || u.icon ? (
              <div className={styles.wrapper}>
                <img src={u.communityIcon || u.icon} alt="" />
              </div>
            ) : (
              <Badge side={50} text={u.name} color={u.primaryColor} />
            )}
            <div className={styles.infos}>
              <b>{u.name}</b>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Autocomplete
