// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse} from "next"; 
import api from "../../services/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if(method !== "POST") {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Method Not Allowed"
    })
  }

  const data = req.body;
  console.log("data api login", data);
  try {
    const resHeroku = await api.callJson('member/login.php', { data, method })
    res.statusCode = 200;
    res.json(resHeroku);
  } catch (error) {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}
