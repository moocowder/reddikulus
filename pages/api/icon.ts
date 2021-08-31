import type { NextApiRequest, NextApiResponse } from "next"

//get all topics
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { sub } = req.query
  let r = await fetch(`https://reddit.com/r/${sub}/about.json`)
  let d = await r.json()

  res.status(200).json({ img: d.data.icon_img || d.data.community_icon })
}
