import connect from "@/utils/db";
import Video from "@/utils/models/Video";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request:NextRequest) => {
  // const { query } = request;
  // const tags = query.tags.split(","); 
  const { searchParams } = new URL(request.url);
  const tags = searchParams.get('query')

  try {
      await connect()
    const videos = await Video.find({ title: { $regex: tags, $options: "i" } }).limit(20);
    console.log(videos)
    return new NextResponse(JSON.stringify(videos),{status:200})
  } catch (err) {
    console.error(err);
  }
};