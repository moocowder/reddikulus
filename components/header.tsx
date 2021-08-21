import Autocomplete from "./autocomplete"
import styles from "../styles/header.module.css"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/userContext"
import { HiTrendingUp } from "react-icons/hi"

function Header({ setOpen }: { setOpen: Function }) {
  const [user, setUser] = useContext(UserContext)

  function logout() {
    setUser({})
    localStorage.removeItem("user")
  }

  return (
    <div className={styles.container}>
      <Link href="/">
        <img src="/axolotl.svg" alt="" />
      </Link>
      <HiTrendingUp onClick={() => setOpen(true)} />
      <Autocomplete />
      {JSON.stringify(user) !== "{}" ? (
        <div style={{ display: "flex " }}>
          <div>
            <img style={{ height: "100%" }} src={user.icon} alt="" />
            <span>{user.name}</span>
          </div>
          <span onClick={logout}>Logout</span>
        </div>
      ) : (
        <a
          style={{ fontSize: "24px", color: "red" }}
          href="https://www.reddit.com/api/v1/authorize?client_id=vskQlp48i50FcgXAenvHbA&response_type=code&state=astringofyourshoosing&redirect_uri=http://localhost:3000/login&duration=temporary&scope=identity read"
        >
          login
        </a>
      )}
    </div>
  )
}
export default Header
