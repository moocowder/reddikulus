import { useEffect, useState, useRef } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import styles from "../styles/Home.module.css"
import useLoadData from "../hooks/useLoadData"
import Masonry from "../components/masonry"
import Viewer from "../components/viewer"
import Post from "../schema/post"
import { GetServerSideProps } from "next"
import fs from "fs"
import Topic from "../schema/topic"
import Topics from "../components/topics"
import Header from "../components/header"
import Content from "../components/content"

type Sub = {
  name: string
  subscribers: string
  title: string
  isNSFW: boolean
  icon: string
  banner?: string
}

export default function Home({ allSubs }: { allSubs: Sub[] }) {
  return (
    <div>
      <Head>
        <title>Reddikulus! | Search for communities</title>
      </Head>
      <ul>
        {allSubs.map((s: Sub) => (
          <li style={{ color: "pink" }}>
            <Link href={`/r/${s.name}`}>{s.name}</Link>
          </li>
        ))}
      </ul>
      <Content useLoad={useLoadData} word="popular" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // let topics: Topic[] = JSON.parse(fs.readFileSync("data.json", "utf8"))
  let allSubs = JSON.parse(fs.readFileSync("all.json", "utf8"))

  return { props: { allSubs } }
}
