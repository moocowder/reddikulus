import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import styles from "../styles/autocomplete.module.css"

type Sub = {
  name: string
  icon: string
  community_icon: string
  numSubscribers: string
  //   type: "sub" | "user"
}

type user = {
  icon: string
}

function Autocomplete() {
  let [query, setQuery] = useState("")
  let [subs, setSubs] = useState<Sub[]>([])
  const router = useRouter()

  useEffect(() => {
    let cancel: any
    axios({
      method: "GET",
      url: `https://www.reddit.com/api/subreddit_autocomplete.json`,
      params: { query, include_over_18: "on" },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((r) => {
        r.data.subreddits = r.data.subreddits.map((s: any) => {
          console.log(s.name.substr(0, 2), "<<<<<<<<<<<,")

          if (s.name.substr(0, 2) === "u_") {
            console.log("***************")
            s.name = s.name.replace(/^u_/, "u/")
          } else {
            s.name = "r/" + s.name
          }
          return s
        })
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
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") router.push(`/search?q=${query}`)
        }}
        type="text"
      />
      <ul className={styles.list}>
        {subs?.map((s: any) => (
          //   <Link href={`/r/${s.name}`}>
          <li
            className={styles.item}
            onClick={() => {
              setQuery("")
              router.push(`/${s.name}`)
            }}
          >
            <img src={s.community_icon || s.icon} alt="" />
            <div className={styles.infos}>
              <span>{s.name}</span>
              <b>{s.numSubscribers}</b> members
            </div>
          </li>
          //   </Link>
        ))}
      </ul>
    </div>
  )
}

export default Autocomplete
