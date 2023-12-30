import { User } from "@/models/User";

export default async function handler(req, res) {
  const { email } = req.body;
  res.json(await User.find({ email }));
}
