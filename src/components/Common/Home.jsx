import React from 'react'
import AlbumSlider from '../AlbumSlider'
import AlbumRoot from './AlbumRoot'
import { useNavigate } from 'react-router-dom'
const Home = () => {

  return (
    <div className='mb-[200px] flex flex-col'>
    {/* <AlbumSlider></AlbumSlider> */}
    <AlbumRoot/>
    </div>
  )
}

export default Home
