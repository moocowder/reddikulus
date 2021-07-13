import { useEffect, useState, useRef } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import styles from "../styles/Home.module.css"

export default function Home() {
  let [query, setQuery] = useState("")
  let [subs, setSubs] = useState([])

  useEffect(() => {
    let cancel
    axios({
      method: "GET",
      url: `https://www.reddit.com/api/subreddit_autocomplete.json`,
      params: { query, include_over_18: "on" },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((r) => setSubs(r.data.subreddits))
      .catch((e) => {
        if (axios.isCancel(e)) return
        console.log("erreur : ", e)
      })
    return () => cancel()
  }, [query])

  return (
    <div>
      <Head>
        <title>Gazer | Search for communities</title>
      </Head>

      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        type="text"
      />
      <ul>
        {subs?.map((s) => (
          <li>
            <img
              style={{ width: "50px" }}
              src={s.community_icon || s.icon}
              alt=""
            />
            <br />
            <Link href={`/r/${s.name}`}>{s.name}</Link>
            <br />
            <b>{s.numSubscribers}</b> members
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  )
}
