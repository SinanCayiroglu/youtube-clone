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
  const [selectedGenre, setSelectedGenre] = useState("All");
  const fetchVideos = async (genre) => {
    try {
      const response = await fetch(`/api/videos/tags?tags=${genre}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching videos: ${error.message}`);
      throw error;
    }
  };
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    console.log(`Selected genre: ${genre}`);

    fetchVideos(genre).then(setVideos);
  };

  useEffect(() => {
    // Fetch initial videos when the component mounts
    fetchVideos(selectedGenre)
    .then((data) => {
      console.log(`Setting videos: `, data);
      setVideos(data);
    })
    .catch((error) => {
      console.error("Error fetching videos:", error);
    });

  }, [selectedGenre]);
  return (
      <div className="max-h-screen flex flex-col">
            <div className="sticky top-0 bg-white z-10 pb-4 ">
        <Genres handleGenreClick={handleGenreClick}/>
        </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {videos.map((video) => (
          <Card key={video.id} video={video} />
        ))}
      </div>
      
      </div>
  );
}
