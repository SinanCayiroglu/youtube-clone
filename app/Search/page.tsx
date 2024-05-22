"use client"
import Genres from '@/components/Genres/Genres'
import React, { Suspense, useEffect, useState } from 'react'
import Card from "@/components/Card/Card";
import { useSearchParams } from 'next/navigation';

const VideoList = () => {
    const [videos,setVideos] = useState([])
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
            
          <Card key={video.id} video={video} />
        ))}
      </div>
      
      </div>
  )
}
const page = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <VideoList query={query} />
      </Suspense>
    );
  };

export default page