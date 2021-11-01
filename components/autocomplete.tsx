import { useRouter } from "next/router"
import { useState, useEffect, useContext, useRef } from "react"
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
import useEventListener from "../hooks/useEventListener"

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
  const [display, setDisplay] = useState<boolean>(false)
  let [subs, setSubs] = useState<Item[]>([])
  let [users, setUsers] = useState<Item[]>([])
  let us: Item[] = []
  let ss: Item[] = []

  const url = "https://www.reddit.com/api/subreddit_autocomplete.json"

  const ref = useRef<HTMLDivElement>(null)

  useEventListener("click", (e: any) => {
    if (ref.current == null || ref.current.contains(e.target)) return
    // cb(e)
    // setOpen(false)
    setDisplay(false)
  })

  useEffect(() => {
    if (query === "") {
      setUsers([])
      setSubs([])
      return
    }
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
    <div className={styles.autocomplete} ref={ref}>
      <div style={{ position: "relative" }}>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          onFocus={() => setDisplay(true)}
          // onBlur={() => setDisplay(false)}
          placeholder="search for anything..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setQuery("")
              router.push(`/search?q=${query}`)
            }
          }}
          type="text"
        />

        {query ? <IoMdReturnLeft /> : <BiSearch />}
      </div>
      {display && (
        <ul className={styles.list}>
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
                <Badge
                  side={50}
                  text={i.name.substr(2)}
                  color={i.primaryColor}
                />
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
                <Badge
                  side={50}
                  text={u.name.substr(2)}
                  color={u.primaryColor}
                />
              )}
              <div className={styles.infos}>
                <b>{u.name}</b>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Autocomplete
