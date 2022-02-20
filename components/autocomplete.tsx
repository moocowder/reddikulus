import router, { useRouter } from "next/router"
import { useState, useEffect, useContext, useRef } from "react"
import axios from "axios"
import Link from "next/link"
import styles from "../styles/autocomplete.module.css"
import { FaSearch } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"
import { BsArrowReturnLeft } from "react-icons/bs"
import { GrReturn } from "react-icons/gr"
import { IoMdReturnLeft } from "react-icons/io"
import { AiOutlineEnter } from "react-icons/ai"
import Badge from "./badge"
import format from "../utils/format"
import useEventListener from "../hooks/useEventListener"

interface Item {
  name: string
  icon: string
  subscribers?: number
  color: string
}

function Autocomplete() {
  const router = useRouter()
  let [query, setQuery] = useState("")
  const [display, setDisplay] = useState<boolean>(false)
  let [subs, setSubs] = useState<Item[]>([])
  let [users, setUsers] = useState<Item[]>([])
  let us: Item[] = []
  let ss: Item[] = []

  const url = "https://www.reddit.com/api/subreddit_autocomplete.json"

  const ref = useRef<HTMLDivElement>(null)

  useEventListener("click", (e: any) => {
    if (ref.current == null || ref.current.contains(e.target)) return
    setDisplay(false)
  })

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") setDisplay(false)
  })

  useEffect(() => {
    if (query === "") {
      setUsers([])
      setSubs([])
      return
    }
    call()
  }, [query])

  function call() {
    let cancel: any
    axios({
      method: "GET",
      url,
      params: { query, raw_json: 1 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((r) => {
        r.data.subreddits.map((s: any) => {
          if (s.name.substr(0, 2) === "u_") {
            us.push({
              name: s.name.replace(/^u_/, "u/"),
              icon: s.communityIcon || s.icon,
              color: s.primaryColor,
            })
          } else {
            if (!s.allowedPostTypes.images && !s.allowedPostTypes.videos) return
            ss.push({
              name: "r/" + s.name,
              icon: s.communityIcon || s.icon,
              subscribers: s.numSubscribers,
              color: s.primaryColor,
            })
          }
        })

        setUsers(us)
        setSubs(ss)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        console.log("erreur : ", e)
      })
    return () => cancel()
  }
  return (
    <div className={styles.autocomplete} ref={ref}>
      <div style={{ position: "relative" }}>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          onFocus={() => setDisplay(true)}
          placeholder="search for anything..."
          onKeyPress={(e: any) => {
            if (e.key === "Enter") {
              // setQuery("")
              setDisplay(false)
              e.target.blur()
              router.push(`/search?q=${query}`)
            }
          }}
          style={{ width: display ? "400px" : "" }}
          type="text"
        />

        {query ? <IoMdReturnLeft /> : <BiSearch />}
      </div>
      {display && (
        <ul className={styles.list}>
          {subs?.map((i) => (
            <Item key={i.name} item={i} setQuery={setQuery} />
          ))}
          {subs?.length !== 0 && users.length !== 0 && (
            <li className={styles.separator}></li>
          )}
          {users?.map((i) => (
            <Item key={i.name} item={i} setQuery={setQuery} />
          ))}
        </ul>
      )}
    </div>
  )
}

function Item({ item, setQuery }: { item: Item; setQuery: Function }) {
  let router = useRouter()
  return (
    <a
      href={`/${item.name}`}
      className={styles.item}
      onClick={(e) => {
        e.preventDefault()
        setQuery("")
        router.push(`/${item.name}`)
      }}
    >
      {item.icon ? (
        <div className={styles.wrapper}>
          <img src={item.icon} alt="" />
        </div>
      ) : (
        <Badge side={50} color={item.color} />
      )}
      <div className={styles.infos}>
        <span>{item.name}</span>
        {item.subscribers && <small>{format(item.subscribers)}</small>}
      </div>
    </a>
  )
}
export default Autocomplete
