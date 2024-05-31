import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Comment = async({channel,video}) => {
    const getComment = async()=>{
        const response = await fetch(`https://youtube-clone-one-ashen.vercel.app/api/comment/${video._id}`);
        const data = await response.json();
        return data
    }
    const comments = await getComment()
    console.log(comments)
    // const [comments, setComments] = useState([]);
    // useEffect(() => {
    //     const fetchComments = async () => {
    //       const response = await fetch(`/api/comments?videoId=${videoId}`);
    
    //       if (response.ok) {
    //         const data = await response.json();
    //         setComments(data);
    //       } else {
    //         console.error('Failed to fetch comments:', response.status);
    //       }
    //     };
    
    //     fetchComments();
    //   }, [videoId]);
  return (
    
    <div>
    {comments.length === 0 ? (
      <div>No comments yet.</div>
    ) : (
      comments.map((comment) => (
        <div className="flex mb-2" key={comment._id}>
          <Image src={channel.img} width={40} height={40} className="rounded-full" alt="Channel Image" />
          <div className="flex flex-col ml-2">
            <span>
              @{channel.name} <span>1 day ago</span>
            </span>
            <span>{comment.desc}</span>
          </div>
        </div>
      ))
    )}
  </div>
  )
}

export default Comment
