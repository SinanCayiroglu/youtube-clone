"use client"
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ExploreOutlined, HistoryOutlined, SubscriptionsOutlined, VideoLibraryOutlined } from '@mui/icons-material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import GamesIcon from '@mui/icons-material/Games';
import SportsIcon from '@mui/icons-material/Sports';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

const SideBar = () => {
    const { data: session, status } = useSession();
  return (
    <div className='flex flex-col gap-4 sticky h-screen ml-5 w-[200px]'>
        <div className=' rounded cursor-pointer hover:bg-stone-200'>
        <HomeIcon />
        Home
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
         Shorts
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <SubscriptionsIcon/> Subscriptions 
        </div>
        <hr />
        {status === "authenticated" ?(<>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            You <ArrowForwardIosIcon />
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <VideoLibraryOutlined />Your Channel
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <HistoryOutlined />
            Your History
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <PlaylistPlayIcon/> Your Playlist
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <SmartDisplayIcon/> Your Videos
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <WatchLaterIcon/>  Watch Later
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <ThumbUpIcon/>  Liked Videos
        </div>
        <hr />
        <div >
        <SubscriptionsOutlined /> Subscriptions
        </div></>):(<>
        
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        You <ArrowForwardIosIcon />
    </div>
    <div className='rounded cursor-pointer hover:bg-stone-200'>
        Your History
        
    </div>
    <div>
        To like, comment and subscribe pls sign in
        <Link href="/api/auth/signin"><button className='py-1 px-5 bg-gray-200 rounded-full'>Sign in</button></Link></div></>)}
       
        <hr />
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <ExploreOutlined /> Explore
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <WhatshotIcon />  Trends
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <MusicNoteIcon />  Music
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Live
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <GamesIcon/>  Game
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
        <SportsIcon/>  Sports
        </div>
        <hr />
    </div>
  )
}

export default SideBar