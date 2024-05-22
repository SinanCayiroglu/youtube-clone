import connect from "@/utils/db"
import User from "@/utils/models/User"
import { NextResponse } from "next/server"


export const GET = async(request)=>{
  try {
    await connect()
    const users = await User.find()
    return new NextResponse(JSON.stringify(users))
  } catch (error) {
    
  }
}