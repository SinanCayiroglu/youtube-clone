import connect from "@/utils/db";
import Comment from "@/utils/models/Comment";
import User from "@/utils/models/User";
import Video from "@/utils/models/Video";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const POST = async (request) => {
    await connect()
    const body = await request.json()
    const session = await getServerSession({ req: request, options: options });

    const user = await User.findOne({ name: session.user.name });
    const userId = user._id.toString()
    console.log(body,userId)
    const newComment = new Comment({ ...body, userId });
    console.log(userId)
    try {
      const savedComment = await newComment.save();
      return new NextResponse(JSON.stringify(savedComment),{status:201})
    } catch (err) {
      console.error(err)
    }
  };
  
  // export const DELETE = async (request,{params}) => {
  //   try {
  //       await connect()
  //       const res = request.nextUrl.searchParams

  //     const comment = await Comment.findById(res.params.id);
  //     const video = await Video.findById(res.params.id);
  //     if (req.user.id === comment.userId || req.user.id === video.userId) {
  //       await Comment.findByIdAndDelete(req.params.id);
  //       res.status(200).json("The comment has been deleted.");
  //     } else {
  //       return next(createError(403, "You can delete ony your comment!"));
  //     }
  //   } catch (err) {
  //     console.error(err)
  //   }
  // };
  
  export const GET = async (request,{params}) => {
    const {id} = params
    try {
        await connect()
      const comments = await Comment.find({ videoId: id });
      return new NextResponse(JSON.stringify(comments),{status:201})
    } catch (err) {
      console.error(err)
    }
  };