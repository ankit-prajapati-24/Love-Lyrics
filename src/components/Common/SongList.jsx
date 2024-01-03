import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaDownload } from 'react-icons/fa6';
import { PiWaveformFill } from "react-icons/pi";
import { useEffect } from 'react';

import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import {
  setName,
  setSinger,
  setSongUrl,
  setImg,
  settrackId
} from '../../slices/player';
import toast from 'react-hot-toast';

const SongList = ({song,index}) => {
    
    const dispatch = useDispatch();
    const audioRef = useRef();
    const albumName = useSelector((state) => state.Album.Albumname);
    const albumimg = useSelector((state) => state.Album.Albumimg);
    const Songs = useSelector((state) => state.Album.Songs);
    const name = useSelector((state) => state.Player.name);
    const trackId = useSelector((state) => state.Player.trackId);
    const [duration ,setDuration] = useState(null);
     const [play , setPlay] = useState(false);
    //  console.log(name, song.Name);
     useEffect(() => {

     }, [name,setName])

     const formatTime = (time) => {
      if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const formatMinutes =
          minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(time % 60);
        const formatSeconds =
          seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatMinutes}:${formatSeconds}`;
      }
      return '00:00';
    };

    const onLoadedMetadata = () => {
      const seconds = audioRef.current.duration;
      setDuration(formatTime(seconds));
      // setDuration(seconds);
      // progressBarRef.current.max = seconds;
    };
     
  return (
    <div
    onClick={() => {
      dispatch(setImg(song.Image));
      dispatch(setSongUrl(song.Url));
      dispatch(setName(song.Name));
      dispatch(setSinger(song.Artists[0]));
      dispatch(settrackId(song._id));
      setPlay(true);
    }}
    key={index}
    className={`flex flex-row items-center justify-between mb-1 duration-200 transition-all rounded-md mx-auto p-3  ${song._id == trackId ?"text-sky-400 shining-text opacity-100":"text-white opacity-80"}`}
  >
    <div className=" font-semibold  lg:w-[25%] flex items-center gap-2 mb-2 lg:mb-0">
    <div>
    {song._id == trackId ?<PiWaveformFill/>:index+1?index+1:""}
    
    
    </div>
    <div>
      {song.Name}
    </div>

    </div>
    <div className=" font-semibold  hidden lg:block lg:w-[28%] mb-2 lg:mb-0 ">
      {song.Artists[0]}
    </div>
    <a
      href={song.Url}
      className=" font-semibold  lg:w-[25%] mb-2   hidden lg:block md:block"
      download="w3logo"
    >
      <FaDownload />
    </a>
    <audio
        src={song.Url}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        // onEnded={handleNext}
      />
    <div className=" font-semibold  lg:w-[25%]  md:block">
      {duration}
    </div>
  </div>
  )
}

export default SongList
