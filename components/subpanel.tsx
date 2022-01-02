import Link from "next/link"
import { useRef } from "react"
import { useEffect, useState } from "react"
import styles from "../styles/subpanel.module.css"
import { useRouter } from "next/router"
import Badge from "./badge"

type Sub = {
  name: string
  icon: string
  // color: string
}

interface Props {
  subs: Sub[]
  setOpen: Function
}

function Subpanel({ subs, setOpen }: Props) {
  const router = useRouter()

  function handleClick(e: any, url: string) {
    e.preventDefault()
    router.push(url)
    setOpen(false)
  }

  return (
    <ul
      className={styles.subpanel}
      onWheel={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {subs?.map((s) => (
        <a
          className={styles.item}
          key={s.name}
          href={"/r/" + s.name}
          onClick={(e) => handleClick(e, "/r/" + s.name)}
        >
          <div className={styles.wrapper}>
            {s.icon ? (
              <img
                src={s.icon.replace(/&amp;/g, "&")}
                style={{ background: "anime" }}
                alt=""
              />
            ) : (
              <Badge side={50} text={"mmm"} color={"magenta"} />
            )}
          </div>
          <span className={styles.text}>{s.name}</span>
        </a>
      ))}
    </ul>
  )
}

export default Subpanel
