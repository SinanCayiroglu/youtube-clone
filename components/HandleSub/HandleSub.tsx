"use client"
import { useSession } from 'next-auth/react';
import React from 'react'

const HandleSub = ({video}) => {
    const { data: session } = useSession();

    const handleSubscribe = async () => {
      if (!session) {
        alert("You need to be logged in to subscribe.");
        return;
      }
  
      try {
        const response = await fetch(`/api/subscribe/${video.userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          alert("Subscription successful.");
        } else {
          const error = await response.json();
          alert(`Subscription failed: ${error.message}`);
        }
      } catch (err) {
        console.error("Subscription error:", err);
        alert("An error occurred while trying to subscribe.");
      }
    };
  return (
    <button onClick={handleSubscribe} className='rounded-full p-2 bg-gray-200 hover:bg-gray-300 ml-5'>Subscribed</button>

  )
}

export default HandleSub