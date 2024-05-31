import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CardList from "@/components/CardList/CardList"
import { useSession } from 'next-auth/react';
import HandleSub from '@/components/HandleSub/HandleSub';
import Like from '@/components/Like/Like';
import Dislike from '@/components/Dislike/Dislike';
import { format } from 'timeago.js';
import Comment from '@/components/Comment/Comment';
import Comments from '@/components/Comments/Comments';



const page = async({params}) => {
  async function getData(id) {
    const res = await fetch(`https://youtube-clone-one-ashen.vercel.app//api/videos/${id}`);
    return res.json();
  }
  const video = await getData(params.id)
  async function getChannel(){
    const res = await fetch(`https://youtube-clone-one-ashen.vercel.app//api/users/${video.userId}`)
    const data = await res.json();
  
    return data
  }
  const channel = await getChannel()
  // const [video,setVideo] = useState("")
  const {tags} = video
 
  // useEffect(()=>{
  //   const fetchVideo = async (id)=>{
  //     try {
  //       const response = await fetch(`/api/videos/${id}`)
  //       const data = await response.json()
  //       setVideo(data)
  //     } catch (error) {
  //       console.error("Error fetching video",error)
  //     }
  //   }
  //     fetchVideo()
  //   }
  // ,[id])
  return (
    <div className='flex'>
        <div>
          <div className='w-full h-[400px]'>
         <video controls  className=" h-full w-full">
          <source type="video/mp4" src={video.videoUrl} />
          Your browser does not support the video tag.
        </video> 
          </div>
        <div className='flex my-2'>
            
            <div className='flex flex-col mx-2 mb-2'>
            <h3>{video.title}</h3>
            <div className='flex'>
            <Image src={channel.img} alt='avatar' width={40} height={40} className='rounded-full'/>
            <div className='flex flex-col ml-2'>

            <span>{channel.name} </span>
            
            <span className='text-[10px]'>{channel.subscribers} subscribers</span>
            </div>
              <HandleSub  video={video}/>
            <div className='flex justify-end ml-96'>
              <Like video={video}/>
              <Dislike video={video}/>
            <ShareIcon className='cursor-pointer mr-5'/>
            <DownloadIcon className='cursor-pointer mr-5'/>
            <MoreHorizIcon className='cursor-pointer mr-5'/>
            </div>
            </div>
            
            <div className='flex flex-col mt-3 bg-gray-200 rounded'>

            <span>{video.views} views {format(video.createdAt)}</span>
            <span>{video.desc}</span>
            </div>

            </div>
            
            </div>
            <Comments channel={channel} video={video}/>
            <Comment channel={channel} video={video}/> 
            </div>
            <div className='flex flex-col'>

            <CardList tags={video.tags}/>
            
            </div>
    </div>
  )
}

export default page
