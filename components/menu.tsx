import { useState } from "react"
import styles from "../styles/menu.module.css"
import Subpanel from "./subpanel"
import { useRef } from "react"
import useEventListener from "../hooks/useEventListener"
import Panel from "./panel"

function Menu({ setOpen }: { setOpen: Function }) {
  const [selected, setSelected] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false)
  })

  useEventListener("click", (e: any) => {
    if (ref.current == null || ref.current.contains(e.target)) return
    setOpen(false)
  })

  return (
    <div ref={ref} className={styles.menu}>
      <Panel selected={selected} setSelected={setSelected} setOpen={setOpen} />
      {selected && <Subpanel selected={selected} setOpen={setOpen} />}
    </div>
  )
}

export default Menu
