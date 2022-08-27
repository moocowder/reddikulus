import styles from "../styles/sort.module.css"
import { AiFillFire, AiOutlineRise } from "react-icons/ai"
import { HiOutlineSparkles } from "react-icons/hi"
import { IoPodium, IoRocket } from "react-icons/io5"
import { BiTargetLock, BiCommentDetail } from "react-icons/bi"
import { FiSunrise } from "react-icons/fi"

import Word from "../schema/sorts"
import { useState } from "react"

const dic: { [key in Word]: any } = {
  best: <IoRocket />,
  hot: <AiFillFire />,
  new: <HiOutlineSparkles />,
  top: <IoPodium />,
  rising: <FiSunrise />,
  relevance: <BiTargetLock />,
  comments: <BiCommentDetail />,
}

// type Time = "hour" | "day" | "week" | "month" | "year" | "all"

function Sort({
  words,
  sort,
  setSort,
}: {
  words: Word[]
  sort: Word
  setSort: Function
}) {
  // const [time, setTime] = useState<Time>("day")
  // const [list, setList] = useState(true)
  return (
    <div className={styles.sort}>
      {words.map((w) => (
        <span
          className={`${styles.word} ${sort === w && styles.active}`}
          key={w}
          onClick={() => setSort(w)}
        >
          {dic[w]}
          {w}
          {/* {w === "top" && sort === "top" && (
            <span style={{ marginLeft: "20px", fontWeight: "bold" }}>
              <small>Today</small>{" "}
            </span>
          )} */}
          {/* {list && (
            <ul>
              <li>today</li>
              <li>tonight</li>
            </ul>
          )} */}
        </span>
      ))}
    </div>
  )
}
export default Sort
