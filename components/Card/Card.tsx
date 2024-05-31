import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import {format} from "timeago.js"


const Video = ({video}:any) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [channel,setChannel] = useState("")
  useEffect(() => {
    fetch(`/api/users/${video.userId}`)
  .then((response) => response.json())
  .then((data) => setChannel(data))
  .catch((error) => {
      console.error('Error fetching channel:', error);
    });
  }, [video.userId]);
  useEffect(() => {
    if (videoRef.current == null) return

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [isVideoPlaying])
  
  return (
    <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] '>
        <div className='flex flex-col gap-2 ' onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}>
        <Link href={`/Video/${video._id}`} className='relative aspect-video'>

        {/* <video controls className='w-full h-full'>
          <source type="video/mp4" src={video.videoUrl} />
          Your browser does not support the video tag.
        </video> */}
        <Image src={video.imgUrl} alt='video' fill/>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
          }`}
          ref={videoRef}
          muted
          playsInline
          src={video.videoUrl}
        /></Link>
            <div className='flex gap-2'>
            <Link href={`/Video/${video._id}`} className='relative aspect-video'>
            <Image src={"/avatar.png"} alt='avatar' width={32} height={32} className='rounded-full'/>
            </Link>
            <div className='flex flex-col '>
            <Link href={`/Video/${video._id}`} className='relative aspect-video'>
            <h3>{video.title}</h3>
            </Link>
            <span className='text-[11px]'>{channel.name}</span>
            <span className='text-xs text-gray-500'>{video.views} views {format(video.createdAt)}</span>
            
            </div>
            
            </div>
             </div>
    </div>
  )
}

export default Video