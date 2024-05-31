"use client"
import { VideoProps } from '@/utils/video';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const CardList = ({tags,channel}) => {
  async function fetchTags() {
    try {
        const response = await fetch(`/api/videos/tags?tags=${tags}`); // Adjust the API endpoint URL as per your setup
        if (!response.ok) {
            throw new Error('Failed to fetch tags');
        }
        const data = await response.json();
        return data; // Assuming the response contains an object with a 'tags' property
    } catch (error) {
        console.error('Error fetching tags:', error);
        return []; // Return an empty array or handle the error based on your requirement
    }
}

// Usage example
const [videos, setVideos] = useState([]);

useEffect(() => {
    if (tags && tags.length > 0) {
      fetchTags().then((data) => setVideos(data));
    }
}, [tags]);

  return (
    
<div className='flex flex-col w-[360px]'>
        {videos.map((video:VideoProps)=>(<a href={`/Video/${video._id}`}>
          <div className='m-5 flex relative w-full h-[120px]' >
            <div className='w-[200px] h-[100px] relative'>

            <Image src={video.imgUrl} alt='thumbnail'fill  />
            </div>
            <div className='flex my-2'>
            <div className='flex flex-col mx-2'>
            <h3>{video.title}</h3>
            <span className='text-[10px]'>{channel.name}</span>
            <span className='text-[10px]'>{video.views} views {format(video.createdAt)}</span>
            </div>
            
            </div>
            
        </div>
        </a>))}
            </div>
    
  )
}

export default CardList
