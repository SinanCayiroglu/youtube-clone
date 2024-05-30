import connect from "@/utils/db"
import User from "@/utils/models/User"
import { NextResponse } from "next/server"


export const GET = async(request,{params})=>{
  try {
    await connect()
    const {id} = params
    const users = await User.findById(id)
    return new NextResponse(JSON.stringify(users))
  } catch (error) {
    
  }
}
