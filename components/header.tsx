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

function Header({ open, setOpen }: { open: boolean; setOpen: Function }) {
  const router = useRouter()
  const [user, setUser] = useContext(UserContext)

  function logout() {
    setUser({})
    localStorage.removeItem("user")
  }

  return (
    <div className={styles.container}>
      <div>
        <div
          onClick={() => setOpen(!open)}
          className={styles.open}
          style={{
            background: open ? "var(--sorbe)" : "",
            color: open ? "white" : "",
          }}
        >
          <IoMenu />
        </div>
        <Link href="/">
          <img
            style={{ cursor: "pointer", height: "80%", width: "200px" }}
            src="/reddikulus-logo.png"
            alt=""
          />
        </Link>
      </div>
      <Autocomplete />
      <div>
        <div className={styles.icons}>
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
        </div>
        {JSON.stringify(user) !== "{}" ? (
          <div className={styles.session}>
            <div
              className={styles.user}
              onClick={() => router.push("/u/" + user.name)}
            >
              <img src={user.icon} alt="" />
              <span>{user.name}</span>
            </div>
            <div className={styles.login}>
              <IoMdLogOut title="Logout" onClick={logout} />
            </div>
          </div>
        ) : (
          <a
            title="Login"
            className={styles.login}
            href="https://www.reddit.com/api/v1/authorize?client_id=vskQlp48i50FcgXAenvHbA&response_type=code&state=astringofyourshoosing&redirect_uri=http://localhost:3000/login&duration=temporary&scope=identity read"
          >
            Login
          </a>
        )}
      </div>
    </div>
  )
}
export default Header
