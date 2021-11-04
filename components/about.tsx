import { FaUsers, FaStar, FaBirthdayCake } from "react-icons/fa"
import styles from "../styles/about.module.css"
import format from "../utils/format"
import date from "../utils/date"

interface Props {
  name: string
  title: string
  created: number
  members?: number
  karma?: number
  text: string
}
function About({ name, title, created, members, karma, text }: Props) {
  return (
    <div className={styles.infos}>
      <a
        className={styles.name}
        target="_blank"
        href={`https://reddit.com/${name}`}
      >
        {name}
      </a>
      <b className={styles.title}>{title}</b>
      <div className={styles.stats}>
        {members && (
          <span>
            <FaUsers />
            {format(members)}
          </span>
        )}
        {karma && (
          <span>
            <FaStar />
            {format(karma)}
          </span>
        )}
        <span>
          <FaBirthdayCake />
          {date(created)}
        </span>
      </div>
      <p>{text}</p>
    </div>
  )
}
export default About
