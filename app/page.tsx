"use client"
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar"
import SideBar from "@/components/SideBar/SideBar";
import Card from "@/components/Card/Card";
import Link from "next/link";
import Genres from "@/components/Genres/Genres";
import { useEffect, useState } from "react";
export default function Home() {
  const [videos,setVideos] = useState([])
  useEffect(()=>{
    fetch("/api/videos")
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
      <div className="flex flex-wrap ml-5">
      {videos.map((video) => (
          <Card key={video.id} video={video} />
        ))}
      </div>
      
      </div>
  );
}
