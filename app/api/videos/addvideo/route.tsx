import { NextRequest, NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from "next";

import connect from '@/utils/db';  // Adjust the path to your database utility
import Video from '@/utils/models/Video';  // Adjust the path to your Video model
import { getServerSession } from "next-auth";

async function parseRequestBody(request: NextRequest) {
  const body = await request.json();
  return body;
}

// export const POST = async (request: NextRequest) => {
//   try {
//     await connect();

//     const body = await parseRequestBody(request);
//     const { userId, title, desc, videoUrl } = body;

//     if (!userId || !title || !desc || !videoUrl) {
//       return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//     }

//     const newVideo = new Video({ userId, title, desc, videoUrl });
//     const savedVideo = await newVideo.save();

//     return NextResponse.json(savedVideo, { status: 200 });
//   } catch (error) {
//     console.error("Error saving video:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// };

// export const POST = async(req: NextApiRequest, res: NextApiResponse)=>{
//   const newVideo = new Video({ userId: req.user.id, ...req.body });
//   try {
//     const savedVideo = await newVideo.save();
//     res.status(200).json(savedVideo);
//   } catch (err) {
//     console.log(err)
//   }
// }
export const POST = async (req) => {
  try {
    await connect();

    const session = await getServerSession({ req });

    if (!session) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { user } = session;
    console.log(user)
    const newVideo = new Video({ userId: user.id, ...req.body });
    const savedVideo = await newVideo.save();

    return new NextResponse(JSON.stringify(savedVideo), { status: 200 });
  } catch (error) {
    console.error('Error uploading video:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};