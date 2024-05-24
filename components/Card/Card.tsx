import { VideoProps } from '@/utils/video';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {format} from "timeago.js"


const Video = ({video}) => {
  const [channel,setChannel] = useState("")
  useEffect(() => {
    fetch(`/api/users/${video.userId}`)
  .then((response) => response.json())
  .then((data) => setChannel(data))
  .catch((error) => {
      console.error('Error fetching channel:', error);
    });
  }, [video.userId]);
  
  
  return (
    <div className='flex flex-1 justify-between mb-4 rounded'>
        <div className='mb-4  flex flex-col max-w-[500px] flex-1 w-[300px] h-[300px] '>
        <Link href={`/Video/${video._id}`}>
          <div className='flex flex-1 w-[300px]  h-[250px] '>
        {/* <video controls className='w-full h-full'>
          <source type="video/mp4" src={video.videoUrl} />
          Your browser does not support the video tag.
        </video> */}
        <Image src={video.imgUrl} alt='video' width={300} height={250}/>
          </div>
            <div className='p-4 flex my-2'>
            <div className=''>
            <Image src={"/avatar.png"} alt='avatar' width={32} height={32} className='rounded-full'/>
            </div>
            <div className='flex flex-col mx-2'>
            <h3>{video.title}</h3>
            <span className='text-[11px]'>{channel.name}</span>
            <span className='text-xs text-gray-500'>{video.views} views {format(video.createdAt)}</span>
            </div>
            
            </div>
            </Link>
             </div>
    </div>
  )
}

export default Video