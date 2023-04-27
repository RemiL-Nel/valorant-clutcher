// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";
import bcrypt from "bcrypt";

type Data = {
  name: string;
};

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};
const client = sanityClient(config);
export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { nickname, email, password } = JSON.parse(req.body);
  const slug = {
    _type: "slug",
    current: nickname.replace(" ", "-").toLowerCase(),
  };

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client
      .fetch(`*[_type == "user" && email == "${email}"]`)
      .then((res) => res[0]);
    if (!user) {
      const nicknameCheck = await client
        .fetch(`*[_type == "user" && nickname == "${nickname}"]`)
        .then((res) => res[0]);
      if (!nicknameCheck) {
        await client.create({
          _type: "user",
          nickname,
          email,
          password: hashedPassword,
          slug,
        });
        console.log("User created");
        return res.status(200).json({ message: "Comment submitted" } as any);
      } else {
        return res
          .status(400)
          .json({ message: "User exists : Nickname already used" } as any);
      }
    } else {
      return res
        .status(400)
        .json({ message: "User exists : Email already used" } as any);
    }
  } catch (err) {
    return res.status(500).json({ message: `Couldnt create User`, err } as any);
  }
}
