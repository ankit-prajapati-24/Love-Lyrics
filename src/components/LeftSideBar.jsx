import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { IoHomeSharp } from 'react-icons/io5';
import { FaGripfire } from 'react-icons/fa';
import { IoMusicalNotes } from 'react-icons/io5';
import { CgUserlane } from 'react-icons/cg';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { FaHeartbeat } from 'react-icons/fa';
import { BsMusicNoteList } from 'react-icons/bs';
import { useSelector,useDispatch } from 'react-redux';
import { setMenu } from '../slices/Navbar';
const links = [
  { to: '/Home', icon: <IoHomeSharp  />, text: 'Home' },
  { to: '/Artist', icon: <CgUserlane />, text: 'Artist' },
  { to: '/Trending', icon: <FaGripfire />, text: 'Trending' },
  { to: '/New', icon: <IoMusicalNotes />, text: 'New' },
  { to: '', icon: " ", text: 'Library' },
  { to: '/NewPlaylist', icon: <MdFormatListBulletedAdd />, text: 'New Playlist' },
  { to: '/Favorite', icon: <FaHeartbeat />, text: 'Favorite' },
  { to: '/MyPlaylist', icon: <BsMusicNoteList />, text: 'My Playlist' },
  { to: '/AddAlbum', icon: <BsMusicNoteList />, text: 'Add Album' },
];

const LeftSideBar = () => {
  
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.Navbar.menu);
  const nevigate = useNavigate();
  const [windowWidth,setwindowWidth] = useState(0);
  const [path,setpath] = useState('');
  console.log(windowWidth);
  useEffect(() => {
    setwindowWidth(window.innerWidth);
    const location = window.location.pathname;
    setpath(location);
    console.log("this is location",location);
  
  }, [window.innerWidth,window.location.pathname])
  
  return (
    <div className={` flex-col gap-5   items-baseline  transition-all duration-200 bg-black w-[50%] md:w-[20%] lg:w-[15%] h-screen  border-t border-t-gray-400  p-5  text-white z-30    absolute md:relative lg:relative lg:flex md:flex
     ${menu&&windowWidth < 500 ?"-translate-x-52  ":""}
     
     `}>
      <div className='flex flex-col gap-3 items-start justify-center '>
      
        <h1 className='font-bold text-lg  text-center '>Music</h1>
        <ul className='flex flex-col gap-4 items-start justify-start'> 
          {links.map((link, index) => (
            <li key={index} className='flex' onClick={()=> setTimeout(()=>{dispatch(setMenu(!menu))},200 )}>
              <NavLink to={link.to} className={`flex text-gray-400 text-lg ${path === link.to ?"text-sky-500": link.text === '/' ?"text-sky-500":""} font-bold items-center justify-center ${link.text == "Library" ?"text-white":""} hover:text-sky-400 gap-4 `}>
                {link.icon}
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default LeftSideBar;
