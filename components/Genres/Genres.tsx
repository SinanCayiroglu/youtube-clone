import React, { useEffect, useState } from 'react'

const Genres = ({handleGenreClick}) => {
  const genres = ["all","anime","music","video","movies","javascript"]
  return (
      <div className='overflow-x-hidden relative'>
          <div className='flex whitespace-nowrap gap-3 transition-transform w-[max-content]'>
          {genres.map((genre) => (
        <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1' key={genre} onClick={() => handleGenreClick(genre)}>
          {genre}
        </button>
      ))}
            {/* <button className='rounded text-secondary bg-secondary-dark hover:bg-secondary-dark-hover ml-5 px-3 py-1'  onClick={() => handleGenreClick("All")}>All</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'  onClick={() => handleGenreClick("game")}>Game</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'  onClick={() => handleGenreClick("music")}>Music</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'  onClick={() => handleGenreClick("Sitcom")}>Sitcom</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'  onClick={() => handleGenreClick("Cartoons")}>Cartoons</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'  onClick={() => handleGenreClick("Roblox")}>Roblox</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'  onClick={() => handleGenreClick("Footbal")}>Football</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'  onClick={() => handleGenreClick("Javascript")}>Javascript</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'>Html</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'>Css</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'>Tailwind</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'>Box</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'>Bootstrap</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'>Nextjs</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'>React</button>
            <button className='rounded bg-secondary hover:bg-secondary-hover ml-5 px-3 py-1'>Basketball</button> */}

          </div>
      </div>

  )
}

export default Genres