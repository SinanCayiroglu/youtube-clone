"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CardList from "@/components/CardList/CardList"
const page = ({params}) => {
  const [video,setVideo] = useState("")
  const {id} = params
  useEffect(()=>{
    const fetchVideo = async ()=>{
      try {
        const response = await fetch(`/api/videos/${id}`)
        const data = await response.json()
        setVideo(data)
      } catch (error) {
        console.error("Error fetching video",error)
      }
    }
      fetchVideo()
    }
  ,[id])
  return (
    <div className='flex'>
        <div>

         <video controls width="100%" height="100%">
          <source type="video/mp4" src={video.videoUrl} />
          Your browser does not support the video tag.
        </video> 
        <div className='flex my-2'>
            
            <div className='flex flex-col mx-2 mb-2'>
            <h3>{video.title}</h3>
            <div className='flex'>
            <Image src={"/avatar.png"} alt='avatar' width={32} height={32} className='rounded-full'/>
            <div className='flex flex-col ml-2'>

            <span>Channel name</span>
            
            <span>999 subscribers</span>
            </div>
            <button className='rounded-full p-2 bg-gray-200 ml-5'>Subscribed</button>
            <div className='flex justify-end ml-96'>
            <ThumbUpIcon className='cursor-pointer mr-5'/>
            <ThumbDownIcon className='cursor-pointer mr-5'/>
            <ShareIcon className='cursor-pointer mr-5'/>
            <DownloadIcon className='cursor-pointer mr-5'/>
            <MoreHorizIcon className='cursor-pointer mr-5'/>
            </div>
            </div>
            
            <div className='flex flex-col mt-3 bg-gray-200 rounded'>

            <span>{video.views} views 1 month ago</span>
            <span>{video.desc}</span>
            </div>

            </div>
            
            </div>
            </div>
            <div className='flex flex-col'>

            <CardList />
            <CardList />
            </div>
    </div>
  )
}

export default page