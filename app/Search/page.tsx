"use client"
import Genres from '@/components/Genres/Genres'
import React, { useEffect, useState } from 'react'
import Card from "@/components/Card/Card";
import { useSearchParams } from 'next/navigation';

const page = () => {
    const [videos,setVideos] = useState([])
    const searchParams = useSearchParams();
     const query = searchParams.get('query')
    // const router = useRouter();
    // const query = router.query;
    console.log(query);
  useEffect(()=>{
    fetch(`/api/videos/search?query=${query}`)
    .then((response) => response.json())
    .then((data) => {
       setVideos(data);
     })
    .catch((error) => {
       console.error("Error fetching videos:", error);
     });
  },[])
  return (
    <div className="flex flex-col">
        <Genres />
      <div className="flex flex-col ml-5">
      {videos.map((video) => (
        <div className='flex'>
            
          <Card key={video.id} video={video} />
        </div>
        ))}
      </div>
      
      </div>
  )
}

export default page