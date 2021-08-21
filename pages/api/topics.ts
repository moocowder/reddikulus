import fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"

//get all topics
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let topics = JSON.parse(fs.readFileSync("data.json", "utf8"))

  res.status(200).json(topics.map((t: any) => t.topic))
}
