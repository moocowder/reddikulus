import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import styles from "../../styles/subreddit.module.css"
import Content from "../../components/content"
import format from "../../utils/format"
import date from "../../utils/date"
import Cover from "../../components/cover"
import About from "../../components/about"

type About = {
  banner: string
  icon: string
  title: string
  subscribers: number
  created: number
  public_description: string
  color: string
  allow_media: boolean
}

type Props = {
  sub: string
  about: About
}

function Subreddit({ sub, about }: Props) {
  if (!about) return <h1>subreddit "{sub}" doesn't exist.</h1>
  if (!about.allow_media)
    return <h1>This sub doesn't contain any images or videos</h1>

  return (
    <div>
      <Head>
        <title>{sub}</title>
      </Head>
      <Cover banner={about.banner} icon={about.icon} color={about.color} />
      <About
        name={"r/" + sub}
        title={about.title}
        created={about.created}
        members={about.subscribers}
        text={about.public_description}
      />
      <Content
        api="/api/posts"
        params={{ sub, sort: "hot" }}
        sorts={["hot", "new", "top", "rising"]}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let sub = context.params?.subreddit
  let res = await fetch(`https://reddit.com/r/${sub}/about.json?raw_json=1`)
  let data = await res.json()
  let about: About | null

  if (data.kind === "Listing") about = null
  else
    about = {
      banner:
        data.data.banner_background_image ||
        data.data.banner_img ||
        data.data.mobile_banner_image,
      icon:
        data.data.community_icon || data.data.icon_img || data.data.header_img,
      title: data.data.title,
      subscribers: data.data.subscribers,
      created: data.data.created,
      public_description: data.data.public_description,
      color:
        data.data.banner_background_color ||
        data.data.primary_color ||
        data.data.key_color,
      allow_media:
        data.data.allow_galleries ||
        data.data.allow_videogifs ||
        data.data.allow_videos ||
        data.data.allow_images,
    }
  return { props: { sub, about } }
}

export default Subreddit
