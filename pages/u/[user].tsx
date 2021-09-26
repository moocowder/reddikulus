import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import styles from "../../styles/subreddit.module.css"
import Content from "../../components/content"

type About = {
  title: string
  // name: string
  description: string
  public_description: string
  icon_img: string
  snoovatar_img: string
  banner_img: string
}

type Props = {
  user: string
  about: About
}

function User({ user, about }: Props) {
  return (
    <div>
      <Head>
        <title>{user}</title>
      </Head>

      <div className={styles.wrapper}>
        <img
          className={styles.banner}
          src={about.banner_img?.replace(/\?.*/, "")}
          alt=""
        />
      </div>
      <img
        className={styles.icon}
        src={
          about.icon_img?.replace(/\?.*/, "") ||
          about.snoovatar_img?.replace(/\?.*/, "")
        }
        alt=""
      />

      <br />
      <br />
      <h1>
        <a href={`https://reddit.com/u/${user}`}>u/{user}</a>
      </h1>
      <h1>{about.title}</h1>
      <p>{about.description}</p>
      <p>{about.public_description}</p>
      {/* <Content useLoad={useLoadUser} word={user} sortInit="new" /> */}
      <Content api="/api/user" params={{ user, sort: "new" }} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let user = context.params?.user
  let res = await fetch(`https://reddit.com/u/${user}/about.json`)
  let data = await res.json()

  let about = {
    title: data.data.subreddit.title,
    // name: data.data.name,
    description: data.data.subreddit.description,
    public_description: data.data.subreddit.public_description,
    icon_img: data.data.icon_img,
    snoovatar_img: data.data.snoovatar_img,
    banner_img: data.data.subreddit.banner_img,
  }
  return { props: { user, about } }
}

export default User
