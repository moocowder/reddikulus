import Autocomplete from "./autocomplete"
import styles from "../styles/header.module.css"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/userContext"

type Infos = {
  name: string
  icon: string
}

function Header() {
  const [user, setUser] = useContext(UserContext)
  const [infos, setInfos] = useState<Infos>({ name: "", icon: "" })

  function logout() {
    setUser("")
    localStorage.removeItem("access_token")
  }

  useEffect(() => {
    if (!user) return
    fetch("https://oauth.reddit.com/api/me", {
      headers: { Authorization: "Bearer " + user },
    })
      .then((r) => r.json())
      .then((d) =>
        setInfos({
          name: d.data.name,
          icon: d.data.icon_img.replace(/\?.*/, "") || d.data.snoovatar_img,
        })
      )
      .catch((e) => console.log(e))
  }, [user])

  return (
    <div className={styles.container}>
      <Link href="/">
        <img src="/axolotl.svg" alt="" />
      </Link>
      <Autocomplete />
      {user ? (
        <div style={{ display: "flex " }}>
          <div>
            <img style={{ height: "100%" }} src={infos.icon} alt="" />
            <span>{infos.name}</span>
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
