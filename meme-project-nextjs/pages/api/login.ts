// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse} from "next"; 

import api from "../../services/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.headers.cookie);
  const method = req.method;
  if(method !== "POST") {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Method Not Allowed"
    })
  }

  const data = req.body;
  try {
    const resHeroku = await api.callJson('member/login.php', { data, method });
    const currentTime = new Date();
    const nextYear = new Date(currentTime.getFullYear() + 1, currentTime.getMonth());
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Token', 'value sdsfhfh sa');
    res.setHeader('Set-Cookie', `token=${resHeroku.token}; expires=${nextYear.toUTCString()}; Path=/`);

    res.json(resHeroku);
  } catch (error) {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}
