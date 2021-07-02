import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import useLoadMore from "../hooks/useLoadMore"

export default function Home() {
  let [query, setQuery] = useState("")
  let [subs, setSubs] = useState([])

  useEffect(() => {
    async function getSubs() {
      const res = await fetch(
        `https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=${query}`
      )
      const data = await res.json()
      setSubs(data.data.children)
      console.log(subs)
    }
    getSubs()
  }, [query])

  return (
    <div>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        type="text"
      />
      <ul>
        {subs?.map((s: any) => (
          <li>
            <a href={`/${s.data.display_name}`}> {s.data.display_name}</a>
            <p>{s.data.title}</p>
            <img src={s.data.icon_img} alt="" />
            <b>{s.data.subscribers}</b> members
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  )
}
