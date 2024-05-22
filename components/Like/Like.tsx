"use client"
import { useSession } from 'next-auth/react';
import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Like = ({video}) => {
    const { data: session } = useSession();

    const handleLike = async () => {
      if (!session) {
        alert("You need to be logged in to like.");
        return;
      }
  
      try {
        const response = await fetch(`/api/like/${video._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          alert("Video liked.");
        } else {
          const error = await response.json();
          alert(`like failed: ${error.message}`);
        }
      } catch (err) {
        console.error("like error:", err);
        alert("An error occurred while trying to like.");
      }
    };
    
  return (
    <div className='flex justify-center ' onClick={handleLike}>
            <ThumbUpIcon className='cursor-pointer mr-5 '/>
            {video.likes.length}
              </div>
  )
}

export default Like