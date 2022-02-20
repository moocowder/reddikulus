import { useEffect, useState, useRef, useContext } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import fs from "fs"
import Content from "../components/content"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Reddikulus! | A truly amusing client for Reddit.</title>
      </Head>

      <>
        <h1 className="title">Popular posts</h1>
        <Content
          api={`r/popular/SORT?after=AFTER`}
          sorts={{ words: ["hot", "new", "top", "rising"], default: "hot" }}
        />
      </>
    </div>
  )
}
