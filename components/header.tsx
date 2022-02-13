import Autocomplete from "./autocomplete"
import styles from "../styles/header.module.css"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { HiTrendingUp } from "react-icons/hi"
import { IoMenu } from "react-icons/io5"
import { GrReddit } from "react-icons/gr"
import { BsFillHeartFill } from "react-icons/bs"
import { FaReddit } from "react-icons/fa"
import { SiReddit } from "react-icons/si"
import { IoMdLogOut } from "react-icons/io"
import { useRouter } from "next/router"
import { BiLogOutCircle, BiLogInCircle } from "react-icons/bi"
import { CgArrowTopRightO } from "react-icons/cg"

function Header({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (o: boolean) => void
}) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div
          onClick={() => setOpen(!open)}
          className={styles.open}
          style={{
            background: open ? "var(--sorbe)" : "",
            color: open ? "white" : "",
          }}
        >
          <HiTrendingUp />
        </div>
        <Link href="/">
          <img src="/reddikulus-logo.png" alt="" />
        </Link>
      </div>

      <div className={styles.right}>
        <Autocomplete />
        <div className={styles.icons}>
          <SiReddit />
          <BsFillHeartFill />
        </div>
      </div>
    </div>
  )
}
export default Header
