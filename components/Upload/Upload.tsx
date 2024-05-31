import React, { useEffect, useState } from "react";
import { getStorage, ref,getDownloadURL, uploadBytesResumable } from "firebase/storage";
import app from "@/utils/firebase"
import { useRouter } from "next/router";

const Upload = ({setOpen}) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    


    const handleChange = (e)=>{
        setInputs((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }
    const handleTags = (e) =>{
        setTags(e.target.value.split(","))
    }

    const uploadFile = (file,urlType) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime()+file.name
        const storageRef = ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storageRef,file)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {},
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setInputs((prev) => {
                  return { ...prev, [urlType]: downloadURL };
                });
              });
            }
          );
        };

        useEffect(()=>{
            video && uploadFile(video,"videoUrl")
        },[video])

        useEffect(()=>{
            img && uploadFile(img,"imgUrl")
        },[img])

        const handleUpload = async (e)=>{
            e.preventDefault()
            const res = await fetch("/api/videos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...inputs, tags }),
            });
            setOpen(false)
        }
  return (
    <div className="h-full w-full absolute top-0 left-0 bg-transparent flex items-center justify-center z-20">

    <div className="relative flex flex-col gap-5 p-5 bg-slate-500">
      <div onClick={() => setOpen(false)} className="cursor-pointer">X</div>
        <h1>Upload a new video</h1>
        <label>Video:</label>
        {videoPerc >0?("Uploading:"+videoPerc):(<input type="file" accept="video/*" onChange={(e)=>setVideo(e.target.files[0])} />)}
        <input type="text" placeholder="Title" name="title" onChange={handleChange}/>
        <textarea placeholder="Description" name="desc" rows={8} onChange={handleChange} />
        <input type="text" placeholder="Seperate the tags with commas" onChange={handleTags}/>
        <label >Image:</label>
        {imgPerc >0?("Uploading:"+imgPerc +"%"):(<input type="file" accept="image/*" onChange={(e)=>setImg(e.target.files[0])}/>)}
        <button type="submit" onClick={handleUpload}>Upload Video</button>
    </div>
    </div>
  );
};

export default Upload;
