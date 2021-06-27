import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

export default function Home() {
  return <div>hooo</div>
}

export async function getServerSideProps() {
  // const res = await fetch(`https://reddit.com/r/memes.json?limit=25&after=`)
  // const data = await res.json()
  // console.log(data)
  // if (!data) {
  //   return {
  //     notFound: true,
  //   }
  // }
  // return {
  //   props: { data },
  // }
}
