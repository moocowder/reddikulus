import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Content from "../../components/content"
import Cover from "../../components/cover"
import About from "../../components/about"

type About = {
  title: string
  // name: string
  description: string
  karma: number
  created: number
  public_description: string
  avatar: string
  icon: string
  banner: string
}

type Props = {
  user: string
  about: About
}

function User({ user, about }: Props) {
  if (!user) return <h1>user doesn't exist</h1>
  return (
    <div>
      <Head>
        <title>{user}</title>
      </Head>
      <Cover banner={about.banner} avatar={about.avatar} icon={about.icon} />
      <About
        name={"u/" + user}
        title={about.title}
        karma={about.karma}
        created={about.created}
        text={about.description}
      />
      <Content
        api="/api/user"
        params={{ user, sort: "new" }}
        sorts={["new", "hot", "top"]}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let user = context.params?.user
  let res = await fetch(`https://reddit.com/u/${user}/about.json?raw_json=1`)
  if (res.status === 404) return { props: { user: null, about: null } }
  let data = await res.json()

  let about = {
    title: data.data.subreddit.title,
    // name: data.data.name,
    // description: data.data.subreddit.description,
    karma: data.data.total_karma,
    created: data.data.created,
    description: data.data.subreddit.public_description,
    icon: data.data.icon_img?.replace(/\?.*/, ""),
    avatar: data.data.snoovatar_img,
    banner: data.data.subreddit.banner_img?.replace(/\?.*/, ""),
  }
  return { props: { user, about } }
}

export default User
