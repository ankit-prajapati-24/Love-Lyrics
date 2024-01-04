import React, { useState, useEffect } from 'react';
import { apiConnecter } from '../services/apiconnecter';
import { useNavigate } from 'react-router-dom';
import AlbumCard from './Common/AlbumCard';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setAlbumName, setAlbumimg, setSongs } from '../slices/album';

const Artists = () => {
    const nevigate = useNavigate();
    const dispatch = useDispatch();
 
  const [loader, setLoader] = useState(false);
  const [artists, setArtists] = useState([]);
  async function getArtists() {
    try {
      setLoader(true);
      const res = await apiConnecter('POST', 'tracks/getArtists');
      console.log(res);
      setArtists(res.data.data);
      setLoader(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div className='flex  bg-black text-white w-full '>
      {loader ? (
        <div className='flex flex-wrap items-center  justify-center'>
      {[...Array(30)].map((_, index) => (
        <div className=" bg-black opacity-40 rounded-md content-center p-4">
  <Skeleton height={80} width={80}  baseColor='gray' circle={true} />
  <Skeleton height={20} inline={true} width={80} baseColor='gray' containerClassName="flex-1" />
</div>
          ))}
      </div>
      ) : (
        <div className='flex p-2 lg:gap-3 flex-wrap  '>
          {artists.map((artist) => (
            <div key={artist._id} className='flex flex-col gap-2 group relative  lg:gap-4 lg:bg-gray-900  items-center justify-center  min-h-[100px] lg:w-[150px]    lg:h-[150px]  sm:max-h-[125px] p-2 rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-200 shadow-md   w-[125px] ' onClick={()=> {
            
                console.log("clicled");
                dispatch(setAlbumName(artist.Name));
                dispatch(setAlbumimg(artist.Image));
                dispatch(setSongs(artist.Songs));
                nevigate("/AlbumSongs");
            }}>
              {/* Use a common image for all artists, or apply a common styling */}
              <div className='relative   flex  items-center justify-center  rounded-full object- object-center bg-repeat-round  h-[80px] w-[80px] object-contain'  style={{ backgroundImage: `url(${artist.Image})` }}>
                
              {/* <img src={artist.Image} alt='Artist' className='max-w-[100px] h-full max-h-[100px]  rounded-full ' /> */}
              <button className='bg-sky-500 rounded-full p-3  group-hover:opacity-100 opacity-0 absolute  group-hover:-translate-Z-full transition-all duration-1000'>
        <FaPlay />
      </button>
              </div>
              <span className='mx-auto  text-center  text-xs'>{artist.Name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Artists;
