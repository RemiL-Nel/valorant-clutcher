// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

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
export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    videoTitle,
    video,
    info,
    option1,
    option2,
    option3,
    option4,
    answer,
    secondsUntilPause,
    publishedAt,
  } = JSON.parse(req.body);
  const slug = {
    _type: "slug",
    current: videoTitle.replace(" ", "-").toLowerCase(),
  };
  try {
    await client.create({
      _type: "post",
      videoTitle,
      video,
      info,
      option1,
      option2,
      option3,
      option4,
      answer,
      secondsUntilPause,
      publishedAt,
      slug,
    });
  } catch (err) {
    return res.status(500).json({ message: `Couldnt create Post`, err } as any);
  }
  console.log("Post created");
  return res.status(200).json({ message: "Post submitted" } as any);
}
