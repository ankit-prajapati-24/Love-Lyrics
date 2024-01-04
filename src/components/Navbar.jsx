import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import logo from '../components/assets/real-logo.jpg';
import {setMenu} from '../slices/Navbar'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setquery } from '../slices/UserDataSlice';
import { Link } from 'react-router-dom';
import { setsearch } from '../slices/UserDataSlice';
const Navbar = () => {
    const query = useSelector((state) => state.User.query);
    const search = useSelector((state) => state.User.search);
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.Navbar.menu);
  const [windowWidth,setwindowWidth] = useState(0);
  const nevigate = useNavigate();
  function SubmitHandeler(event){
    event.preventDefault();
    console.log(query,"this is query");
    // nevigate("/SearchResult")
}
useEffect(() => {
    if(query){
        nevigate("/SearchResult")
        dispatch(setsearch(!search));
    }
    console.log(query);
    setwindowWidth(window.innerWidth);
  }, [window.innerWidth,query])
  

  return (
    <div className=' flex justify-between flex-col items-center bg-black p-3 text-white  overflow-x-hidden w-full'>
       

<div className='flex  items-center justify-between w-full self-baseline'>
<div className='w-full max-w-[50px] flex lg:hidden md:hidden' onClick={()=> dispatch(setMenu(!menu))}>
       {
        menu?<GiHamburgerMenu style={{ height: 30, width: 30 }} />:<ImCross style={{ height: 25, width: 25 }}/>
       }
       </div>
       <div className='w-full max-w-[100px]'>
       <img src={logo} className='rounded-md mix-blend-normal  mix-blend-exclusion'></img>
       </div>
       
{
 windowWidth > 500 && <form className=' w-full  max-w-[500px] ' onSubmit={(e)=>  SubmitHandeler(e)}>   
    <label for="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-black">Search</label>
    <div class="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onChange={(e)=>dispatch(setquery(e.target.value))} type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>
        {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
    </div>
</form>

}
        <div className='flex items-center justify-center p-2  max-w-[400px] gap-3'>
 
          <Link to="/Login">
          <button className=" max-w-[400px] p-2 border border-white rounded-md flex items-center justify-center hover:scale-95 transition-all duration-200 text-sm min-w-[60px]">Log in</button>
          </Link>
          <Link to="/Signup">
          <button className=" max-w-[400px] p-2 border border-white rounded-md flex items-center justify-center hover:scale-95 transition-all duration-200 text-sm min-w-[60px]">SignUp</button>
          </Link>
          
        <FaUserCircle className='h-5 w-5 text-[#61dafb]' style={{ height: '30px', width: '30px', }} />
        </div>
</div>
        
        {
          windowWidth < 500 &&<form className=' w-full  max-w-[500px] ' onSubmit={(e)=>  SubmitHandeler(e)}>   
    <label for="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-black">Search</label>
    <div class="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onChange={(e)=>dispatch(setquery(e.target.value))} type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>
        {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
    </div>
</form>
        }

    </div>
  )
}

export default Navbar
