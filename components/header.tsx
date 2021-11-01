import Autocomplete from "./autocomplete"
import styles from "../styles/header.module.css"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/userContext"
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
  const router = useRouter()
  const [user, setUser] = useContext(UserContext)

  const id = "vskQlp48i50FcgXAenvHbA"
  const url = "http://localhost:3000"
  const callbackUrl = `https://www.reddit.com/api/v1/authorize?client_id=${id}&response_type=code&state=astringofyourshoosing&redirect_uri=${process.env.NEXT_PUBLIC_URL}/login&duration=permanent&scope=identity read`

  function logout() {
    setUser({})
    localStorage.removeItem("user")
  }

  function handleLogin() {
    window.open(
      callbackUrl,
      "_blank",
      "location=yes,height=570,width=520,scrollbars=yes,status=yes"
    )
  }

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
      <Autocomplete />
      <div className={styles.right}>
        {/* <div className={styles.icons}>
          <div className={styles.open}>
            <BsFillHeartFill title="Support me!" />
          </div>
          <SiReddit title="r/reddikulus" />
          {JSON.stringify(user) !== "{}" && (
            <CgArrowTopRightO
              onClick={() => router.push("/r/popular")}
              title="popular"
            />
          )}
        </div> */}
        {JSON.stringify(user) !== "{}" ? (
          <div className={styles.session}>
            <div
              className={styles.user}
              onClick={() => router.push("/u/" + user.name)}
            >
              {/* need a wrapper here */}
              <img src={user.icon} alt="" />
              <span>{user.name}</span>
            </div>
            <div className={styles.login} onClick={logout}>
              {/* <IoMdLogOut title="Logout"  /> */}
              Logout
            </div>
          </div>
        ) : (
          <a title="Login" className={styles.login} onClick={handleLogin}>
            Login
          </a>
        )}
      </div>
    </div>
  )
}
export default Header
