import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { access_token, refresh_token, sort, after } = req.query

  let r = await fetch(
    `https://oauth.reddit.com/${sort}?after=${after}&raw_json=1`,
    {
      headers: { Authorization: "Bearer " + access_token },
    }
  )
  // if (r.status === 401)
  let data = await r.json()
  res.status(200).json(data.data)
}

async function refresh(refresh_token: string) {
  let res = await fetch(`https://www.reddit.com/api/v1/access_token`, {
    method: "POST",
    headers: {
      contentType: "application/x-www-form-urlencoded",
      Authorization:
        "Basic dnNrUWxwNDhpNTBGY2dYQWVudkhiQTpLLU9MRXJPWkFaRzRWNkM2OEI0cU9FaVltRUxfSlE=",
    },
    body: new URLSearchParams({
      // code,
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      // redirect_uri: "http://localhost:3000/login",
    }),
  })
}
