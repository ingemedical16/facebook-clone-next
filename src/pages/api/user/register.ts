import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  

  if (req.method === "POST") {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {

res.status(400).json({ error: (error as Error).message });

    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
