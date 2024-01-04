import React from 'react'
import { FaPlay, FaPause, FaRegHeart, FaHeart } from "react-icons/fa";
const AnimatedButton = () => {
  return (
    <div className='flex items-center justify-center '>
      <button className='bg-sky-500 rounded-full p-4 hover:scale-95'>
              <FaPlay />
     </button>
    </div>
  )
}

export default AnimatedButton
