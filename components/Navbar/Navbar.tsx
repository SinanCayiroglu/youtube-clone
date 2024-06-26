"use client"
import React, { useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import UploadIcon from "@mui/icons-material/Upload";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Image from "next/image";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSession,signOut  } from "next-auth/react";
import Upload from "@/components/Upload/Upload"

const Navbar = () => {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [open, setOpen] = useState(false);
  const [query,setQuery] = useState("")
  
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
    <div className="flex items-center gap-10 lg:gap-20 h-16 justify-between mx-5">
      <div className="flex items-center cursor-pointer">
        <DensityMediumIcon className="cursor-pointer hover:bg-secondary p-2.5 w-10 h-10 flex rounded-full items-center justify-center transition-colors" />
        <Link href={"/"}>
          <div className="flex">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={32}
              height={32}
              className="ml-5"
            />
            <h1>Youtube</h1>
          </div>
        </Link>
      </div>
      <div className="flex  flex-grow itemms-center justify-center">
        <div className="relative flex flex-grow max-w-[600px]">
            <input
              type="text"
              placeholder="search"
              className="rounded-full border-2 py-1 px-4 w-full focus:border-blue-500 outline-none"
              onChange={(e)=>setQuery(e.target.value)}
            />
            <button onClick={()=>window.location.href = `/Search?query=${query}`} className="rounded-e-full bg-stone-300 px-4 py-2 absolute top-0 right-0">
              <SearchIcon />
            </button>
        </div>
        <button className="p-2.5 w-10 h-10 ml-5 flex rounded-full items-center justify-center hover:bg-secondary-hover bg-secondary cursor-pointer">
          <MicIcon className="" />
        </button>
      </div>
      {status === "authenticated" ? (
        <div className="flex items-center">
          <UploadIcon className="mr-5 p-2.5 w-10 h-10  flex rounded-full items-center justify-center hover:bg-secondary cursor-pointer" onClick={() => setOpen(true)} />
          <NotificationsNoneIcon className="mr-5 p-2.5 w-10 h-10  flex rounded-full items-center justify-center hover:bg-secondary cursor-pointer" />
          <Image
            src={session.user.image}
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full cursor-pointer"
            onClick={handleDropdownToggle}
          />
          {showDropdown && (
            <div className="absolute top-16 right-0 bg-white shadow-md p-2 rounded-md z-10">
            <ul>
              <li className="py-1 px-2 hover:bg-gray-100">
                <a href="#">Profile</a>
              </li>
              <li className="py-1 px-2 hover:bg-gray-100">
                <a href="#">Settings</a>
              </li>
            </ul>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          )}
        </div>
      ) : (
        <div>
          <MoreVertIcon />
          <Link href={"/api/auth/signin"}>
            <button className="px-2 rounded-full">Sign in</button>
          </Link>
        </div>
      )}
    </div>
    {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
