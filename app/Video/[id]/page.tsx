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

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/videos/${id}`, {
    cache: "no-store",
  });

 

  return res.json();
}

const page = async({params}) => {
  // const [video,setVideo] = useState("")
  const video = await getData(params.id)
  const {tags} = video
  async function getChannel(){
    const res = await fetch(`http://localhost:3000/api/users/${video.userId}`)
    return res.json()
  }
  const channel = await getChannel()

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
            <Image src={channel.img} alt='avatar' width={32} height={32} className='rounded-full'/>
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
            </div>
            <div className='flex flex-col'>

            <CardList tags={video.tags}/>
            
            </div>
    </div>
  )
}

export default page