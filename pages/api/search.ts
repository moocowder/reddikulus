import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { q, sort, after, nsfw } = req.query
  console.log(
    `https://reddit.com/search.json?q=${q}&sort=${sort}&after=${after}&include_over_18=${nsfw}`
  )
  let r = await fetch(
    `https://reddit.com/search.json?q=${q}&sort=${sort}&after=${after}&include_over_18=${nsfw}&raw_json=1`
  )
  let data = await r.json()
  res.status(200).json(data.data)
}
