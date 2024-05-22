import connect from "@/utils/db"
import Video from "@/utils/models/Video"
import { NextRequest, NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options } from '../auth/[...nextauth]/options'
import { authMiddleware } from "@/utils/auth";
import User from "@/utils/models/User";



export const GET = async(request)=>{
  try {
    await connect()
    const videos = await Video.find()
    return new NextResponse(JSON.stringify(videos))
  } catch (error) {
    
  }
}

export const POST = async(request:NextRequest)=>{
//   const authResult = await authMiddleware(request);
// if (authResult.status !== 200) {
//     return authResult;
//   }
  const body = await request.json()
  
 
  try {
    await connect()
    const session = await getServerSession({ req: request, options: options });
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const user = await User.findOne({ name: session.user.name });
    // const userId = (request as any).user.id;  // Get user ID from request
    // const userId = session.user.id
    const userId = user._id.toString()
    // const { userId, ...videoData } = body;

    console.log(userId)
    console.log(body)
    const newVideo = new Video({ userId, ...body });
    await newVideo.save();
    return new NextResponse("Video has been saved",{status:201})
  } catch (err) {
    return new NextResponse("Database Error 2",{status:500})
  }
}

// export const POST = async (request: NextRequest) => {
//   try {
//     const body = await request.json();
//     await connect();

//     const session = await getServerSession({ req: request, options: authOptions });

//     if (!session || !session.user || !session.user.id) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }

//     const userId = session.user.id;
//  console.log(userId)
//     console.log(body)
//     const newVideo = new Video({ userId, ...body });

//     await newVideo.save();

//     return new NextResponse('Video has been saved', { status: 201 });
//   } catch (err) {
//     console.error('Database Error:', err);
//     return new NextResponse('Database Error', { status: 500 });
//   }
// };


