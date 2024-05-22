import connect from "@/utils/db";
import User from "@/utils/models/User";
import Video from "@/utils/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from '../../auth/[...nextauth]/options'




export const PUT = async (request:NextRequest,{params}: { params: { id: string } }) => {
    
    try {
        await connect
        const session = await getServerSession({ req:  request as NextRequest, options: options });
  
        const user = await User.findOne({ name: session.user.name });
        const userId = user._id.toString()
    const {id} = params;
    console.log(userId)
    console.log(id)
    const video = await Video.findById(id);

    const liked = video.dislikes.includes(userId);
    if (liked) {
      // Remove like if already liked
      await Video.findByIdAndUpdate(id, { $pull: { dislikes: userId }, });
      return new NextResponse("The video like has been removed.", { status: 200 });
    } else {
      // Add like if not liked
      await Video.findByIdAndUpdate(id, { $addToSet: { dislikes: userId },$pull:{likes:userId} });
      return new NextResponse("The video has been liked.", { status: 200 });
    }
    
    } catch (err) {
      console.error(err)
    }
  };