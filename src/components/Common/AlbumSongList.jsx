import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaDownload } from 'react-icons/fa6';

import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiSolidSkipNextCircle } from 'react-icons/bi';
import { IoPlaySkipBackCircleSharp } from 'react-icons/io5';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { useEffect } from 'react';
import {
  setName,
  setSinger,
  setSongUrl,
  setImg,
  name
} from '../../slices/player';
import SongList from './SongList';
import toast from 'react-hot-toast';


const AlbumSongList = () => {
  const dispatch = useDispatch();
  const albumName = useSelector((state) => state.Album.Albumname);
  const albumimg = useSelector((state) => state.Album.Albumimg);
  const songlist = useSelector((state) => state.Album.Songs);
  const Songs = songlist.filter((song, index, self) =>
  index === self.findIndex((s) => s.Name === song.Name)
);
  const trackIndex = useSelector((state) => state.Album.trackIndex);
  // const [Name, setName] = useState("");
  const [play, setPlay] = useState(false);
  const [fav, setFav] = useState(false);
  
  // toast.loading("loading...")

  const compareSongs = (song1, song2) => {
    const name1 = song1.Name.toLowerCase();
    const name2 = song2.Name.toLowerCase();

    if (name1 > name2) {
      return -1;
    }
    if (name1 < name2) {
      return 1;
    }
    return 0;
  };
    function PlayallTrack(){
      setPlay(!play);
      // if(Songs.length > 0){
        if(!play){
          console.log(Songs.length,Songs[0]);
          dispatch(setSongUrl(Songs[0].Url));
          dispatch(setName(Songs[0].Name));
          dispatch(setSinger(Songs[0].Artists[0]));
          dispatch(setImg(Songs[0].Image));
        }
      // }
    }
   function FavHandler(){
     if(fav){
      setFav(false);
      toast('Album Liked..', {
        icon: '😍',
      });
     }
     else{
      setFav(true)
      toast('Album UnLiked..', {
        icon: '😓',
      });
     }
   }

  useEffect(() => {
    
    setName(window.location.pathname.slice(1))
  }, [name, setName, setSongUrl])

  return (
    <div
      className={`flex flex-col  items-center mb-4 bg-cover bg-no-repeat relative overflow-x-hidden bg-[#838996]  `}
      style={{ backgroundImage: `url(${albumimg})` }}
    >
      {/* White background overlay */}
      {/* <div className="absolute inset-0  opacity-75"></div> */}

      {/* Backdrop blur effect */}
      {/* <div className="absolute inset-0 backdrop-blur-3xl"></div> */}


      <div className="flex gap-3  flex-col   lg:flex-row  h-[400px] border-b  self-baseline max-h-[350px] lg:h-[300px]  items-center gap-y-9  backdrop-blur-3xl p-4 relative z-10  w-full "
      >
        <img
          src={albumimg}
          alt="album"
          className="w-full h-full max-w-[200px] ali self-start lg:self-end max-h-[150px] lg:max-w-[250px]  lg:max-h-[230px]  shadow-2xl drop-shadow-3xl shadow-black hover:scale-105 transition-all duration-200  lg: lg:mb-0 rounded-md"
        />
        <div className="flex self-start lg:self-end flex-col text-3xl lg:text-3xl font-bold flex-wrap lg:mx-4  mb-4 -mt-3 lg:mb-0 ">

          <span className="bg-clip-text  text-[30px] mt-4 lg:text-sm text-xs  text-white font-extrabold  ">
            Album
          </span>
          <span className="bg-clip-text text-[30px] mt-4 md:text-[50px] lg:text-[50px] lg:my-6 text-white font-extrabold  ">
            {albumName}
          </span>
          <span className="bg-clip-text  mt-4 lg:text-sm text-xs  text-white font-extrabold  ">
            Total Track : {Songs && Songs.length}
          </span>
          <span className="bg-clip-text mt-4 lg:text-sm text-xs  text-white font-extrabold  ">
            Artists : Arijit Singh , Atif aslam, kk and more ...
          </span>
        </div>

      </div>

      <div className="flex flex-col items-center justify-between w-full backdrop-blur-3xl bg-transparent-gradient   relative z-10  object-cover  ">
        <div className="flex flex-col  items-center justify-between p-2 h-[150px]  text-blue-400     w-full">
          <div className=' self-start  flex items-center  ' >
            <button
              className='bg-sky-500 rounded-full text-white p-4 hover:scale-95'
              onClick={() => PlayallTrack()}
            >
              {play ? <FaPause /> : <FaPlay />}
            </button>
            <span className='text-sm ml-2 font-bold'>
              Play All </span>
          <button
            className='rounded-full p-4 hover:scale-95'
            onClick={() => FavHandler()}
          >
            {fav ? (
              <FaRegHeart style={{ color: 'pink', height: 30, width: 30 }} />

            ) : (
              <FaHeart style={{ color: 'pink', height: 30, width: 30 }} />
            )}
            
          </button>
          </div>
          <div className='flex flex-row items-center justify-between pt-5 p-2 h-[150px]  text-gray-300 border-b border-b-white   w-full'>
            <div className="font-bold text-lg w-full lg:w-[25%] mb-2 lg:mb-0">
              Title
            </div>
            <div className="font-bold text-lg lg:w-[25%] hidden lg:block mb-2 lg:mb-0">
              Album
            </div>
            <div className="font-bold text-lg lg:w-[25%] mb-2 lg:mb-0 hidden lg:block md:block">
              Download
            </div>
            <div className="font-bold text-lg lg:w-[25%] md:block">
              Duration
            </div>
          </div>

        </div>
        {/* <hr></hr> */}
        <div className="w-full  py-2 group mb-4 lg:mb-[300px]  ">
          {Songs &&
            Songs.map((song, index) => (
              <SongList song={song} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumSongList;
