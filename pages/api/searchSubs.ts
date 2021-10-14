import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { q } = req.query
  // https://www.reddit.com/subreddits/search?q=bryce+dallas&include_over_18=true&count=75&after=t5_2ub69

  let url = `https://www.reddit.com/subreddits/search?q=${q}&include_over_18=on&raw_json=1`
  console.log(url)
  let r = await fetch(url)
  let d = await r.json()
  res.status(200).json(d.data.children)
}
