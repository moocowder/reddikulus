import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import styles from "../../styles/subreddit.module.css"
import Content from "../../components/content"
import format from "../../utils/format"
import date from "../../utils/date"
import Cover from "../../components/cover"
import About from "../../components/about"
import api from "../../utils/request"
import { useRouter } from "next/router"

type About = {
  banner: string
  icon: string
  title: string
  subscribers: number
  created: number
  public_description: string
  color: string
  allow_media: boolean
  nsfw: boolean
}

type Props = {
  sub: string
  about: About
}

function Subreddit({ sub, about }: Props) {
  const router = useRouter()
  // const api =
  //   "https://api.reddit.com/r/popular/hot?sub=popular&&sort=hot&&after=&&raw_json=1"
  // useEffect(() => {
  //   async function call() {
  //     let data = await api(`r/${router.query.subreddit}/about`, {
  //       raw_json: "1",
  //     })
  //   }

  //   call()
  // }, [])

  function api(type = "sub", page: string, sort: string, after: string) {
    return `r/${page}/${sort}?after=${after}&&raw_json=1`
  }

  if (!about)
    return (
      <h1>
        subreddit not found{" "}
        <span style={{ color: "#ff0066" }}>
          ≽(
          <span style={{ color: "rgb(255, 181, 249)" }}>ᴗ_ᴗˇ </span>
          )≼
        </span>
      </h1>
    )
  // if (about.nsfw)
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         border: "1px solid red",
  //         // height: "100vh",
  //         gap: "20px",
  //       }}
  //     >
  //       <p>this is a +18 community</p>
  //       <img src="/bonk.webp" alt="" />
  //       <p>
  //         <span
  //           style={{ color: "#ff0066", cursor: "pointer" }}
  //           onClick={() => router.back()}
  //         >
  //           get back
  //         </span>
  //         &nbsp;or go to horny jail!
  //       </p>
  //     </div>
  //   )

  return (
    <div>
      <Head>
        <title>r/{sub}</title>
      </Head>
      <Cover banner={about.banner} icon={about.icon} color={about.color} />
      <About
        name={"r/" + sub}
        title={about.title}
        created={about.created}
        members={about.subscribers}
        text={about.public_description}
      />
      {about.allow_media ? (
        <Content
          api="/api/posts"
          params={{ sub }}
          sorts={{ words: ["hot", "new", "top", "rising"], default: "hot" }}
        />
      ) : (
        <h3>This sub doesn't contain any images or videos</h3>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let sub = context.params?.subreddit
  let res = await fetch(`https://reddit.com/r/${sub}/about.json?raw_json=1`)
  if (res.status !== 200) return { props: { sub, about: null } }

  let data = await res.json()
  if (data.kind === "Listing") return { props: { sub, about: null } }

  let about: About

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
    nsfw: data.data.over18,
  }
  return { props: { sub, about } }
}

export default Subreddit
