import Head from "next/head"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import useLoadMore from "../hooks/useLoadMore"

export default function Home() {
  let [query, setQuery] = useState("")
  let [subs, setSubs] = useState([])

  // let ob = useRef("init")
  // let ob = (node) => {
  //   console.log("goot fur noting", node)
  // }

  useEffect(() => {
    // console.log(ob)
    async function getSubs() {
      const res = await fetch(
        `https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=${query}`
      )
      const data = await res.json()
      setSubs(data.data.children)
    }
    getSubs()
  }, [query])

  return (
    <div>
      <input
        // ref={ob}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        type="text"
      />
      <ul>
        {subs?.map((s) => (
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
