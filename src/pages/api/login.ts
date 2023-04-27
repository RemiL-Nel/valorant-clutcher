import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "yoursecretkey";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: true,
  apiVersion: "2021-10-21",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { nickname, password } = JSON.parse(req.body);
  try {
    const user = await client
      .fetch(
        `*[_type == "user" && nickname == "${nickname}"]{
     nickname,
     email,
      password,
      }`
      )
      .then((res) => res[0]);
    if (!user) {
      return res.status(400).json({ message: "Invalid nickname" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in" });
  }
}
