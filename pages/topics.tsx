import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Viewer from "../components/viewer"
import Masonry from "../components/masonry"
import useLoadData from "../hooks/useLoadData"
import styles from "../../styles/subreddit.module.css"
import Post from "../schema/post"
import Content from "../components/content"

function Topic() {
  return (
    <div>
      <Head>
        <title>Reddikulus | Sports</title>
      </Head>

      <Content
        useLoad={useLoadData}
        word={
          "sports%2BCFB%2Bnba%2Bfantasyfootball%2Bhockey%2BMkeBucks%2BSquaredCircle%2Blakers%2BGreenBayPackers%2BMCFC%2BClevelandIndians%2Bbicyclin%2Bgnhl%2Bcoys%2BFantasyPL%2BNewSkaters%2BDodgers%2Bcanucks%2Bbjj%2BDynastyFF%2BCollegeBasketball%2Bminnesotavikings%2BPremierLeague"
        }
        sortInit="best"
      />
    </div>
  )
}

export default Topic
