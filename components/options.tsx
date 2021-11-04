import styles from "../styles/options.module.css"
import { CgCloseO } from "react-icons/cg"
import { BiFullscreen } from "react-icons/bi"
import { GrCircleQuestion } from "react-icons/gr"
import { FiDownload } from "react-icons/fi"
import { FaKeyboard } from "react-icons/fa"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { FiMaximize, FiMinimize } from "react-icons/fi"
import { useEffect, useState } from "react"
import useTimedState from "../hooks/useTimedState"

interface Props {
  close: Function
  maximize: Function
  minimize: Function
  download: Function
  onMouseEnter: Function
}

function Options({ close, maximize, minimize, download, onMouseEnter }: Props) {
  const [fullscreen, setFullscreen] = useState(false)
  // const [display, setDisplay, cancel] = useTimedState(true)

  // useEffect(() => {
  //   setDisplay(true, 2000)
  // }, [])

  return (
    <ul
      // style={{ opacity: display ? 1 : 0 }}
      className={styles.options}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => onMouseEnter()}
      onMouseMove={(e) => e.stopPropagation()}
      // onMouseLeave={() => setDisplay(false)}
    >
      <li onClick={() => close()}>
        <CgCloseO />
      </li>

      {fullscreen ? (
        <li
          onClick={() => {
            setFullscreen(false)
            minimize()
          }}
        >
          <FiMinimize />
        </li>
      ) : (
        <li
          onClick={() => {
            setFullscreen(true)
            maximize()
          }}
        >
          <FiMaximize />
        </li>
      )}

      <li>
        <FaKeyboard />
      </li>
      <li onClick={() => download()}>
        <FiDownload />
      </li>
    </ul>
  )
}
export default Options
