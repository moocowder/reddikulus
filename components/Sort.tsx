import styles from "../styles/sort.module.css"
import { AiFillFire, AiOutlineRise } from "react-icons/ai"
import { HiOutlineSparkles } from "react-icons/hi"
import { IoPodium, IoRocket } from "react-icons/io5"
import { BiTargetLock, BiCommentDetail } from "react-icons/bi"
import { HiTrendingUp } from "react-icons/hi"
import { FiSunrise } from "react-icons/fi"

import Word from "../schema/sorts"

const dic: { [key in Word]: any } = {
  best: <IoRocket />,
  hot: <AiFillFire />,
  new: <HiOutlineSparkles />,
  top: <IoPodium />,
  rising: <FiSunrise />,
  relevance: <BiTargetLock />,
  comments: <BiCommentDetail />,
}

function Sort({
  words,
  sort,
  setSort,
}: {
  words: Word[]
  sort: Word
  // sort: string
  setSort: Function
}) {
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
        </span>
      ))}
    </div>
  )
}
export default Sort
