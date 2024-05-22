import connect from "@/utils/db";
import User from "@/utils/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from '../../auth/[...nextauth]/options'



export const PUT = async (request:NextRequest,{params}) => {

    try {
        await connect()
        const session = await getServerSession({ req: request, options: options });
  
        const user = await User.findOne({ name: session.user.name });
        const userId = user._id.toString()
        console.log(userId)
        const { id } = params;
        console.log(id)
        const isSubscribed = user.subscribedUsers.includes(id);

        if (isSubscribed) {
          // Unsubscribe
          await User.findByIdAndUpdate(userId, {
            $pull: { subscribedUsers: id },
          });
          await User.findByIdAndUpdate(id, {
            $inc: { subscribers: -1 },
          });
          return new NextResponse("Unsubscription successful.", { status: 200 });
        } else {
          // Subscribe
          await User.findByIdAndUpdate(userId, {
            $push: { subscribedUsers: id },
          });
          await User.findByIdAndUpdate(id, {
            $inc: { subscribers: 1 },
          });
          return new NextResponse("Subscription successful.", { status: 200 });
        }
    } catch (err) {
      console.error(err)
    }
  };