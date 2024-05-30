"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Comment from '../Comment/Comment'
import { useSession } from 'next-auth/react';

const Comments = ({channel,video}) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      alert("You need to be logged in to post a comment.");
      return;
    }
    const videoId = video._id
    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ desc: comment, videoId }),
      });

      if (response.ok) {
        const savedComment = await response.json();
        console.log('Comment saved:', savedComment);
        setComment(""); // Clear the input field
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to save comment");
      }
    } catch (err) {
      console.error('Error saving comment:', err);
      setError("An error occurred while saving the comment");
    }
  };
  const [inputFocused, setInputFocused] = useState(false);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };
  return (
        <div className='flex mb-2' onFocus={handleInputFocus} onBlur={handleInputBlur}>
            { <Image src={channel.img} width={40} height={40} className='rounded-full'/> }
            <form onSubmit={handleSubmit} className='flex w-full'>
            <input placeholder='Add a comment' value={comment}
        onChange={(e) => setComment(e.target.value)} className='ml-2 border-b-2 border-gray-200 p-1  w-full '/>
         
          <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
        {error && <p>{error}</p>}
        </div>
         
  )
}

export default Comments