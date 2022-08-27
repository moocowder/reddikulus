import { GetServerSideProps } from "next"
import Head from "next/head"
import Content from "../../components/content"
import Cover from "../../components/cover"
import About from "../../components/about"
import Bonk from "../../components/bonk"
import Alex from "../../components/alex"

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
  show_media: boolean
}

type Props = {
  sub: string
  about: About
}

function Subreddit({ sub, about }: Props) {
  if (!about) return <Alex face=">_<">subreddit not found</Alex>
  if (about.nsfw) return <Bonk />

  return (
    <div>
      <Head>
        <title>r/{sub}</title>
      </Head>
      <Cover banner={about.banner} icon={about.icon} />
      <About
        name={"r/" + sub}
        title={about.title}
        created={about.created}
        members={about.subscribers}
        text={about.public_description}
      />
      {about.allow_media ? (
        <Content
          api={
            about.show_media
              ? `r/${sub}/SORT?after=AFTER`
              : `r/${sub}+ritditdo/SORT?after=AFTER`
          }
          tag={"subreddit"}
          sorts={{ words: ["hot", "new", "rising", "top"], default: "hot" }}
        />
      ) : (
        <Alex face="⚆ _ ⚆">Subreddit doesn't contain images or videos</Alex>
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
      (data.data.allow_galleries ||
        data.data.allow_videogifs ||
        data.data.allow_videos ||
        data.data.allow_images) &&
      data.data.submission_type !== "self",
    nsfw: data.data.over18,
    show_media: data.data.show_media,
  }
  return { props: { sub, about } }
}

export default Subreddit
