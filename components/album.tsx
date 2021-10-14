import { useEffect, useState } from "react"
import styles from "../styles/album.module.css"
import { IoMdAlbums } from "react-icons/io"
import { FiLayers } from "react-icons/fi"
import { IoLayers } from "react-icons/io5"
import { IoIosAlbums } from "react-icons/io"
import Imagine from "./imagine"
function Album({
  thumbnails,
  originals,
}: {
  thumbnails: string[]
  originals: string[]
}) {
  let [index, setIndex] = useState(0)
  let [hover, setHover] = useState(false)
  let [loaded, setLoaded] = useState(false)

  let timeout: any
  //   useEffect(() => {
  //     if (!hover) return
  //     timeout = setTimeout(() => {
  //       setIndex(index === thumbnails.length - 1 ? 0 : index + 1)
  //     }, 1000)
  //     return () => clearTimeout(timeout)
  //   }, [index, hover])
  useEffect(() => {
    if (!hover) return
    if (!loaded) return
    timeout = setTimeout(() => {
      setIndex(index === thumbnails.length - 1 ? 0 : index + 1)
    }, 1000)
  }, [loaded, hover])

  useEffect(() => {
    setLoaded(false)
  }, [index])

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        clearTimeout(timeout)
        setHover(false)
      }}
    >
      {!hover && <IoLayers className={`${styles.icon} `} />}
      <span className={styles.number}>
        {index + 1}/{thumbnails.length}
      </span>
      {/* <Imagine thumbnail={thumbnails[index]} original={urls[index]} /> */}
      <img className={styles.background} src={thumbnails[index]} alt="" />

      {/* <img
        onLoad={() => setLoaded(true)}
        // onLoadStart={() => alert("loading...")}
        // onLoadCapture={() => {
        //   alert("on load  capture")
        // }}
        // onLoadStartCapture={() => {
        //   setLoaded(false)
        // }}
        // style={{ zIndex: 3 }}
        className={styles.img}
        src={thumbnails[index]}
        alt=""
      /> */}
      <Imagine
        thumbnail={thumbnails[index]}
        original={originals[index]}
        appeared={() => setLoaded(true)}
      />
    </div>
  )
}
export default Album
