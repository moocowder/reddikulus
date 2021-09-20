import { useCallback, useEffect, useRef, useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Viewer from "../../components/viewer"
import Masonry from "../../components/masonry"
import useLoadData from "../../hooks/useLoadData"
import styles from "../../styles/subreddit.module.css"
import Post from "../../schema/post"
import Content from "../../components/content"

type About = {
  // submission_type: string
  banner_img: string
  banner_background_image: string
  // banner_background_color
  mobile_banner_image: string
  header_img: string
  icon_img: string
  community_icon: string
  public_description: string
  primary_color: string
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
      <div
        className={styles.wrapper}
        style={{
          background: about.primary_color || "yellow",
          // boxShadow: "inset 0 -30px 22px -22px  red",
        }}
      >
        <img
          className={styles.banner}
          src={
            about.banner_background_image.replace(/\?.*/, "") ||
            about.banner_img ||
            about.mobile_banner_image
          }
          alt=""
        />
      </div>
      <img
        className={styles.icon}
        src={
          about.community_icon.replace(/\?.*/, "") ||
          about.icon_img ||
          "/axolotl.svg"
        }
        alt=""
      />
      <br />
      <br />
      <h1>
        <a href={`https://reddit.com/r/${sub}`}>r/{sub}</a>
      </h1>
      <p>{about.public_description}</p>
      <Content api="/api/posts" params={{ sub, sort: "hot" }} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let sub = context.params?.subreddit
  let res = await fetch(`https://reddit.com/r/${sub}/about.json`)
  let data = await res.json()
  let about: About | null

  if (data.kind === "Listing") about = null
  else
    about = {
      // submission_type: data.data.submission_type,
      banner_img: data.data.banner_img,
      banner_background_image: data.data.banner_background_image,
      mobile_banner_image: data.data.mobile_banner_image,
      header_img: data.data.header_img,
      icon_img: data.data.icon_img,
      community_icon: data.data.community_icon,
      public_description: data.data.public_description,
      primary_color: data.data.primary_color,
      allow_media:
        data.data.allow_galleries ||
        data.data.allow_videogifs ||
        data.data.allow_videos ||
        data.data.allow_images,
    }
  return { props: { sub, about } }
}

export default Subreddit
