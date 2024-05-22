import connect from '@/utils/db';
import Video from "@/utils/models/Video"
import { NextResponse } from 'next/server';

export const GET = async(request,  { params })=> {

    const { id } = params;

    try {
        await connect();
        const video = await Video.findById(id);

        if (!video) {
            return new NextResponse(JSON.stringify({ message: "Video not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(video), { status: 200 })

    } catch (error) {
        console.error("Error fetching video:", error);
        return new NextResponse(JSON.stringify({ message: "Error occurred while fetching video" }), { status: 500 });
    }
}

