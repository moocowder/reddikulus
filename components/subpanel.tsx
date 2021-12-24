import Link from "next/link"
import { useRef } from "react"
import { useEffect, useState } from "react"
import styles from "../styles/subpanel.module.css"
import { useRouter } from "next/router"
import Badge from "./badge"

type Sub = {
  name: string
  icon: string
  color: string
}

interface Props {
  topic: string
  setOpen: Function
}

function Subpanel({ topic, setOpen }: Props) {
  const [subs, setSubs] = useState<Sub[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState(false)
  const router = useRouter()

  const size = 15
  let observer: IntersectionObserver //= useRef()
  const lastElementRef = (node: HTMLLIElement) => {
    if (loading || done) return
    if (observer) observer.disconnect()
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setPage(page + 1)
    })
    if (node) observer.observe(node)
  }

  useEffect(() => {
    setLoading(true)
    setDone(false)
    setSubs([])
    setPage(0)

    async function dofetch() {
      fetch(`/api/topicSubs?topic=${topic}&&page=0&&size=${size}`)
        .then((r) => r.json())
        .then((d) => {
          setSubs(d)
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false))
    }
    dofetch()
  }, [topic])

  useEffect(() => {
    if (page === 0) return
    setLoading(true)
    fetch(`/api/topicSubs?topic=${topic}&&page=${page}&&size=${size}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.length < size) setDone(true)
        setSubs([...subs, ...d])
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
  }, [page])

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
              <Badge side={50} text={"mmm"} color={s.color} />
            )}
          </div>
          <span className={styles.text}>{s.name}</span>
        </a>
      ))}

      {!done && (
        <>
          <li ref={lastElementRef} className={styles.mock}>
            <div className={styles.wrapper}>
              <div className={styles.circle}></div>
            </div>
            <div className={styles.rectangle}></div>
          </li>
          {Array.from(Array(5).keys()).map((i: number) => (
            <li className={styles.mock} key={i}>
              <div className={styles.wrapper}>
                <div className={styles.circle}></div>
              </div>
              <div className={styles.rectangle}></div>
            </li>
          ))}
        </>
      )}
    </ul>
  )
}

export default Subpanel
