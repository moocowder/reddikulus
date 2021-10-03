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
  const [done, setDone] = useState(false)

  const size = 15
  let observer: IntersectionObserver //= useRef()
  const lastElementRef = (node: HTMLLIElement) => {
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
    setDone(false)
    setPage(0)
    setSubs([])
    fetch(`/api/topicSubs?topic=${topic}&&page=${page}&&size=${size}`)
      .then((r) => r.json())
      .then((d) => {
        setSubs(d)
        setLoading(false)
      })
      .catch((e) => console.log(e))
  }, [topic])

  useEffect(() => {
    if (page === 0) return
    setLoading(true)
    fetch(`/api/topicSubs?topic=${topic}&&page=${page}&&size=${size}`)
      .then((r) => r.json())
      .then((d) => {
        setLoading(false)
        if (d.length < 15) setDone(true)
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
          <div>
            <img src={s.icon} alt="" />
          </div>
          <Link href={"/r/" + s.name}>{s.name}</Link>
        </li>
      ))}

      {!done && (
        <li ref={lastElementRef} className={styles.item} key="1">
          <span className={styles.sk}></span>
          <span className={styles.sk2}></span>
        </li>
      )}
    </ul>
  )
}

export default Subpanel
