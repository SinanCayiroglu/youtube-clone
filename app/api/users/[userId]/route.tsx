import connect from '@/utils/db';
import User from "@/utils/models/User"
import { NextResponse } from 'next/server';

export async function GET(request:any, { params }:any) {

    const { userId } = params;

    await connect();

    try {
        const user = await User.findById(userId);

        if (!user) {
            return new NextResponse("User not found",{status:404})
        }

        return new NextResponse(JSON.stringify(user))

    } catch (error) {
        console.error("Error fetching user:", error);
        return new NextResponse("Error while fetching user",{status:500})
    }
}

