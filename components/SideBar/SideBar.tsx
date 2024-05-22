"use client"
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const SideBar = () => {
    const { data: session, status } = useSession();
  return (
    <div className='flex flex-col justify-between sticky h-screen ml-5' style={{width:"200px"}}>
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
            Your Channel
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Your History
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Your Playlist
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Your Videos
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Watch Later
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Liked Videos
        </div>
        <hr />
        <div >
            Subscriptions
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
            Explore
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Trends
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Music
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Live
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Game
        </div>
        <div className='rounded cursor-pointer hover:bg-stone-200'>
            Sports
        </div>
        <hr />
    </div>
  )
}

export default SideBar