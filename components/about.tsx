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
      <h1>
        <a href={`https://reddit.com/${name}`}>{name}</a>
      </h1>
      <b>{title}</b>
      <div className={styles.stats}>
        {members && (
          <span>
            <FaUsers />
            &nbsp;
            {format(members)}
          </span>
        )}
        {karma && (
          <span>
            <FaStar />
            &nbsp;
            {format(karma)}
          </span>
        )}
        &nbsp;&nbsp;&nbsp;
        <span>
          <FaBirthdayCake />
          &nbsp;
          {date(created)}
        </span>
      </div>
      <p>{text}</p>
    </div>
  )
}
export default About
