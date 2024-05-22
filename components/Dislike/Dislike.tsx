"use client"
import { useSession } from 'next-auth/react';
import React from 'react'
import ThumbDownIcon from '@mui/icons-material/ThumbUp';

const Dislike = ({video}) => {
    const { data: session } = useSession();

    const handledislike = async () => {
      if (!session) {
        alert("You need to be logged in to dislike.");
        return;
      }
  
      try {
        const response = await fetch(`/api/dislike/${video._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          alert("Video disliked.");
        } else {
          const error = await response.json();
          alert(`dislike failed: ${error.message}`);
        }
      } catch (err) {
        console.error("dislike error:", err);
        alert("An error occurred while trying to dislike.");
      }
    };
    
  return (
    <div className='flex justify-center' onClick={handledislike}>
            <ThumbDownIcon className='cursor-pointer mr-5'/>
            {video.dislikes.length}
              </div>
  )
}

export default Dislike