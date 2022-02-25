import type { NextApiRequest, NextApiResponse } from "next"

//get subs of a topic
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const name = req.query.name

  const data = await fetch(
    "https://raw.githubusercontent.com/maathi/topics/master/data.json"
  ).then((r) => r.json())

  const subs = data.find((d: any) => d.name === name).subs

  res.status(200).json(subs)
}
