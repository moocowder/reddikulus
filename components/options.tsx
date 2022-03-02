import styles from "../styles/options.module.css"
import { CgCloseO } from "react-icons/cg"
import { FiDownload } from "react-icons/fi"
import { FaKeyboard } from "react-icons/fa"
import { FiMaximize, FiMinimize } from "react-icons/fi"

interface Props {
  close: Function
  maximize: Function
  minimize: Function
  fullscreen: boolean
  download: Function
  onMouseEnter: Function
  help: boolean
  setHelp: Function
}

function Options({
  close,
  fullscreen,
  maximize,
  minimize,
  download,
  onMouseEnter,
  help,
  setHelp,
}: Props) {
  return (
    <ul
      className={styles.options}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => onMouseEnter()}
      onMouseMove={(e) => e.stopPropagation()}
    >
      <li onClick={() => close()}>
        <CgCloseO />
      </li>

      {fullscreen ? (
        <li onClick={() => minimize()}>
          <FiMinimize />
        </li>
      ) : (
        <li onClick={() => maximize()}>
          <FiMaximize />
        </li>
      )}

      <li
        onClick={() => {
          setHelp(!help)
        }}
      >
        <FaKeyboard />
      </li>
      <li onClick={() => download()}>
        <FiDownload />
      </li>
    </ul>
  )
}
export default Options
