import connect from '@/utils/db';
import User from "@/utils/models/User"
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {

    const { userId } = params;

    await connect();

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return new NextResponse(JSON.stringify(user))

    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error occurred while fetching user" });
    }
}

