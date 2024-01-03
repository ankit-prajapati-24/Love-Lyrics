import React, { useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; 
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FcMusic } from "react-icons/fc";
const AlbumSlider = () => {
    const [play ,setPlay ] = useState(false);
    const CustomNextArrow = (props) => (
        <div
          {...props}
          className="slick-arrow slick-next"
          style={{ right: '60px', zIndex: 1, fontSize: '24px', color: '#fff' }}
        >
          Next
        </div>
      );
    
      const CustomPrevArrow = (props) => (
        <div
          {...props}
          className="slick-arrow slick-prev"
          style={{ left: '10px', zIndex: 1, fontSize: '24px', color: '#fff' }}
        >
          Prev
        </div>
      );
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    };

    const albums = [
        { name: 'Pahale Bhi Me', role: 'Backend Developer', photo:"https://i.ytimg.com/vi/iAIBF2ngbWY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAOJq_9FTC8n6WdvAZ4RqAvaJoiuA" },
        { name: 'Satranga', role: 'Frontend Developer', photo: "https://i.ytimg.com/vi/pToArr-wSLY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQiv8DjEIpq8m2zp6STR65wlkHoQ" },
        { name: 'Heeriye', role: 'Backend Developer', photo: "https://i.ytimg.com/vi/RLzC55ai0eo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCq2nyJ3dp1VKL4P2KmQp3CEw7l_w" },
        { name: 'Tu hai Kahan', role: 'Frontend Developer', photo: "https://i.ytimg.com/vi/8GkPMG8IwBQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC8obqvKqiyKCng5eapDWitKWwvBg" },
    ];

  return (
    <div className=''>
       <Slider {...settings}>
                    {albums.map((member, index) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-black  gap-3  text-white border rounded-md shadow-md flex items-center justify-center flex-col ">
                            <div className='p-3 flex flex-col-reverse items-center justify-around lg:flex-row md:flex-row  '>
                              <div className=' flex items-center justify-center p-4  flex-col'>
                                <FcMusic className='h-50 w-50' style={{ height: '150px', width: '150px',color:"skyblue" }}/>
                              <h3 className="text-xl font-bold mb-2 text-gray-700">{member.name}</h3>
                              <button className='bg-sky-500 rounded-full p-4 hover:scale-95' onClick={()=>setPlay(!play)}>
                                                            {
                                play?<FaPlay ></FaPlay>:<FaPause/>

                              }
                              </button>
                              </div>

                                <img
                                src={member.photo}
                                alt={member.name}
                                className='h-[300px] w-[800px] object-cover border-black border items-center overflow-hidden rounded-md'
                                style={{ filter: 'drop-shadow(5px 6px 6px skyblue)' }}
                                />
 {/* <p className="text-gray-600">{member.role}</p> */}

                            </div>
                        </div>
                    ))}
                </Slider>
      
    </div>
  )
}

export default AlbumSlider
