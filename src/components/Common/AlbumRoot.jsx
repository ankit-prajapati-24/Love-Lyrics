import React, { useEffect, useState } from 'react';
import { apiConnecter } from '../../services/apiconnecter';
import AlbumCard from './AlbumCard';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const AlbumRoot = () => {
  const [loader, setLoader] = useState(false);
  const [albums, setAlbums] = useState([]);

  async function getAlbums() {
    try {
      setLoader(true);
      const res = await apiConnecter('post', 'Album/GetAllAlbum');
      console.log(res.data.Data);
      setAlbums(res.data.Data);
      setLoader(false);
    } catch (err) {
      console.log('err', err);
    }
  }

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div className='h-full w-full overflow-x-scroll lg:overflow-hidden md:overflow-hidden bg-black relative rounded-md text-white flex flex-col  gap-3 mb-[500px] '>
    <h1 className='text-2xl font-bold  '>Albums</h1>
     <div className='flex flex-wrap p-3 m-2 rounded   items-center justify-center self-baseline gap-4    '>
     {loader? 
      <div className='flex   '>
      {[...Array(10)].map((_, index) => (
        <div className="  w-[200px] h-[200px] bg-gray-900 mx-auto p-2 rounded-md  opacity-40 ">
  <Skeleton height={140} inline={true} width={180} baseColor='gray'  containerClassName="flex-1" />
  <Skeleton height={20} width={180}  baseColor='gray' />
</div>
          ))}
      </div>
      :
        albums.map((album) => (
          <AlbumCard key={album.id} Title={album.Name} Image={album.Image} Songs={album.Songs}/>
        ))}
     </div>
    </div>
  );
};

export default AlbumRoot;
