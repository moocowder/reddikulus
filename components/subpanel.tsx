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
  selected: string
  setOpen: Function
}

function Subpanel({ selected, setOpen }: Props) {
  // const [selected, setSelected] = useState<Sub[]>([])
  const [subs, setSubs] = useState<Sub[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  function handleClick(e: any, url: string) {
    e.preventDefault()
    router.push(url)
    setOpen(false)
  }

  useEffect(() => {
    // setSubs([])
    setLoading(true)
    fetch("/api/topic?name=" + selected)
      .then((r) => r.json())
      .then((d) => setSubs(d))
      .catch((e) => console.log("error", e))
  }, [selected])

  useEffect(() => {
    if (subs) setLoading(false)
  }, [subs])

  return (
    <ul
      className={styles.subpanel}
      onWheel={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {loading
        ? Array.from(Array(12).keys()).map((i: number) => (
            <li className={styles.mock} key={i}>
              <div className={styles.circle}></div>
              <div
                className={styles.rectangle}
                style={{ width: Math.random() * (240 - 100) + 100 }}
              ></div>
            </li>
          ))
        : subs?.map((s) => (
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
                    // style={{ background: "anime" }}
                    alt=""
                  />
                ) : (
                  <Badge color={"#ffffff26"} />
                )}
              </div>
              <span className={styles.text}>{s.name}</span>
            </a>
          ))}
    </ul>
  )
}

export default Subpanel
