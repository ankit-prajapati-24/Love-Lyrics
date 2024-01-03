
// import { tracks } from '../data/tracks';
import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiSolidSkipNextCircle } from 'react-icons/bi';
import { IoPlaySkipBackCircleSharp } from 'react-icons/io5';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import src  from '../assets/Dil_Jhoom(128k) (1).m4a'
// import components
const AudioPlayer = () => {
  // states

  const title = useSelector((state) => state.Player.name);
  const author = useSelector((state) => state.Player.singer);
  const src = useSelector((state) => state.Player.songurl);
  const thumbnail = useSelector((state) => state.Player.img);
  const [fav, setFav] = useState(false);
  
  const tracks = [
      {
          title,
          src ,
          author,
          thumbnail,
        },
        // ...
    ];
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(
    tracks[trackIndex]
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  useEffect(()=>{},[title]);
  return (
    <>
      <div className=" bg-black w-full px-2 fixed z-50 bottom-0  rounded-md ">
        <div className="flex flex-col ">
        <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        <div className='flex items-center justify-between'>
        <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              handleNext,
            }}
          />
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
            }}
          />
        <div className='bg-[#000] p-4  gap-2 items-center justify-center hidden lg:flex md:flex'>
          <button
            className='rounded-full p-4 hover:scale-95'
            onClick={() => setFav(!fav)}
          >
            {fav ? (
              <FaRegHeart style={{ color: 'pink', height: 30, width: 30 }} />
            ) : (
              <FaHeart style={{ color: 'pink', height: 30, width: 30 }} />
            )}
          </button>
          <MdFormatListBulletedAdd style={{ color: 'skyblue', height: 30, width: 30 }} />
        </div>
        </div>
         
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;