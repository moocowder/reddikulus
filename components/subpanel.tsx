import Link from "next/link"
import { useRef } from "react"
import { useEffect, useState } from "react"
import styles from "../styles/subpanel.module.css"

type Sub = {
  name: string
  icon: string
}
function Subpanel({ topic, setTopic }: { topic: string; setTopic: Function }) {
  const [subs, setSubs] = useState<Sub[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)

  const size = 15
  let observer //= useRef()
  const lastElementRef = (node: Element) => {
    console.log(":::::::::::::::;")
    if (loading) return
    // if (loading) return
    if (observer) observer.disconnect()
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(page + 1)
        // if (hasMore) loadMore()
        // else setEnd(true)
      }
      // else {
      //   setEnd(false)
      // }
    })
    if (node) observer.observe(node)
  }

  // useEffect(() => {
  //   if (!ref.current) return
  //   let observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       setPage(page + 1)
  //     }
  //   })
  //   observer.observe(ref.current)
  // }, [ref.current])

  useEffect(() => {
    setLoading(true)

    setPage(0)
    fetch(`/api/topicSubs?topic=${topic}&&page=${page}&&size=${size}`)
      .then((r) => r.json())
      .then((d) => {
        setLoading(false)
        setSubs(d)
      })
      .catch((e) => console.log(e))
  }, [topic])

  useEffect(() => {
    setLoading(true)
    if (page === 0) return
    fetch(`/api/topicSubs?topic=${topic}&&page=${page}&&size=${size}`)
      .then((r) => r.json())
      .then((d) => {
        setLoading(false)
        setSubs([...subs, ...d])
      })
      .catch((e) => console.log(e))
  }, [page])

  return (
    <ul
      className={styles.subpanel}
      onWheel={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {subs?.map((s) => (
        <li className={styles.item} key={s.name}>
          <img src={s.icon} alt="" />
          <Link href={"/r/" + s.name}>{s.name}</Link>
        </li>
      ))}
      <p ref={lastElementRef}>Loading...</p>
      <button onClick={() => setPage(page + 1)}>more</button>
    </ul>
  )
}

export default Subpanel
