import Link from "next/link"
import { useRef } from "react"
import { useEffect, useState } from "react"
import styles from "../styles/subpanel.module.css"

type Sub = {
  name: string
  icon: string
}

function Subpanel({
  topic,
  setTopic,
  setOpen,
}: {
  topic: string
  setTopic: Function
  setOpen: Function
}) {
  const [subs, setSubs] = useState<Sub[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState(false)

  const size = 15
  let observer: IntersectionObserver //= useRef()
  const lastElementRef = (node: HTMLLIElement) => {
    if (loading || done) return
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
    setSubs([])
    setPage(0)

    async function dofetch() {
      fetch(`/api/topicSubs?topic=${topic}&&page=0&&size=${size}`)
        .then((r) => r.json())
        .then((d) => {
          setSubs(d)
          setLoading(false)
        })
        .catch((e) => console.log(e))
    }
    dofetch()
  }, [topic])

  useEffect(() => {
    if (page === 0) return
    // alert("page 0")
    setLoading(true)
    fetch(`/api/topicSubs?topic=${topic}&&page=${page}&&size=${size}`)
      .then((r) => r.json())
      .then((d) => {
        setLoading(false)
        if (d.length < size) setDone(true)
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
            {s.icon ? (
              <img
                src={s.icon.replace(/&amp;/g, "&")}
                style={{ background: "anime" }}
                alt=""
              />
            ) : (
              <div style={{ background: "orange" }}>kk</div>
            )}
          </div>
          <Link href={"/r/" + s.name}>
            <div onClick={() => setOpen(false)}>{s.name}</div>
          </Link>
        </li>
      ))}

      {!done && (
        <>
          <li ref={lastElementRef} className={styles.item}>
            <div>
              <div className={styles.sk}></div>
            </div>
            <div className={styles.sk2}></div>
          </li>
          {Array.from(Array(5).keys()).map((i: number) => (
            <li className={styles.item} key={i}>
              <div>
                <div className={styles.sk}></div>
              </div>
              <div className={styles.sk2}></div>
            </li>
          ))}
        </>
      )}
    </ul>
  )
}

export default Subpanel
