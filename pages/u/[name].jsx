import { useRef, useState } from "react"
import Viewer from "../../components/viewer"

import Masonry from "../../components/masonry"
import useLoadMore from "../../hooks/useLoadMore"
import { useCallback } from "react"

function Name({ name }) {
  let [after, setAfter] = useState("")
  let [view, setView] = useState(false)
  let [index, setIndex] = useState()
  let [hover, setHover] = useState(false)
  let { data, loading, error } = useLoadMore("u/" + name, after)

  console.log("dataa.posts on name", data.posts)
  function getPics() {
    return data.posts.map((p) => p.data.url)
  }

  const observer = useRef()
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.after) {
          console.log("this one", entries)
          setAfter(data.after)
        }
      })
      console.log(node)
      if (node) observer.current.observe(node)
    },
    [loading]
  )

  return (
    <div>
      {view ? (
        <Viewer
          posts={data.posts}
          index={index}
          setIndex={setIndex}
          setView={setView}
        />
      ) : (
        ""
      )}
      <h1>r/{name}</h1>
      <Masonry
        posts={data.posts}
        lastElementRef={lastElementRef}
        setIndex={setIndex}
        setView={setView}
        setHover={setHover}
      />

      {error && <h1>error!</h1>}
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let name = context.params?.name
  return { props: { name } }
}

export default Name
