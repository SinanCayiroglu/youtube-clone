import connect from "@/utils/db";
import Video from "@/utils/models/Video";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (request:NextRequest) => {
    // const { query } = request;
    // const tags = query.tags.split(","); 
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get('tags')?.split(",") || [];

    try {
        await connect()
        let videos;
        if (tags.length === 0 || (tags.length === 1 && tags[0].toLowerCase() === "all")) {
            videos = await Video.find().limit(20); // Fetch all videos if no specific tags are provided or tag is "All"
          } else {
            videos = await Video.find({ tags: { $in: tags } }).limit(20);
          }
      return new NextResponse(JSON.stringify(videos),{status:200})
    } catch (err) {
      console.error(err);
    }
  };

  