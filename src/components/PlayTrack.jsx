// import React, { useState, useEffect, useRef } from 'react';
// import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
// import { BiSolidSkipNextCircle } from 'react-icons/bi';
// import { IoPlaySkipBackCircleSharp } from 'react-icons/io5';
// import { MdFormatListBulletedAdd } from 'react-icons/md';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// // import 'react-toastify/dist/ReactToastify.css';

// const PlayTrack = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [play, setPlay] = useState(false);
//   const [fav, setFav] = useState(false);
//   const [second, setSecond] = useState(0);
//   const [minute, setMinutes] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [progressValue, setProgressValue] = useState(0);
//   const [spaceBarClicked, setSpaceBarClicked] = useState(false);

//   const name = useSelector((state) => state.Player.name);
//   const singer = useSelector((state) => state.Player.singer);
//   const songUrl = useSelector((state) => state.Player.songurl);
//   const img = useSelector((state) => state.Player.img);

//   const audioRef = useRef(null);
//   const formatTime = (time) => {
//     if (time && !isNaN(time)) {
//       const minutes = Math.floor(time / 60);
//       const formatMinutes =
//         minutes < 10 ? `0${minutes}` : `${minutes}`;
//       const seconds = Math.floor(time % 60);
//       const formatSeconds =
//         seconds < 10 ? `0${seconds}` : `${seconds}`;
//       return `${formatMinutes}:${formatSeconds}`;
//     }
//     return '00:00';
//   };
//   useEffect(() => {
//     const audioElement = audioRef.current;

//     const handleTimeUpdate = () => {
//       setProgressValue((audioElement.currentTime / audioElement.duration) * 100);
//       setSecond(Math.floor(audioElement.currentTime % 60));

//       if (audioElement.currentTime >= 60) {
//         setMinutes(Math.floor(audioElement.currentTime / 60));
//       }
//     };

//     const handleKeyDown = (event) => {
//       if (event.code === 'Space' && !spaceBarClicked) {
//         handleStop();
//         setSpaceBarClicked(true);
//       }
//     };

//     audioElement.addEventListener('timeupdate', handleTimeUpdate);
//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       audioElement.removeEventListener('timeupdate', handleTimeUpdate);
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [spaceBarClicked]);

//   const handlePlayPause = async () => {
//     const audioElement = audioRef.current;
//     setPlay(!play);

//     if (!play) {
//       // Show loading toast
//       const loadingToastId = toast.loading('Loading...');

//       try {
//         await audioElement.play();
//         setIsPlaying(true);
//       } catch (error) {
//         // Handle play error, if needed
//         console.error('Error playing audio:', error);
//       } finally {
//         // Hide the loading toast after the audio has finished loading
//         toast.dismiss(loadingToastId);
//       }
//     } else {
//       audioElement.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleStop = () => {
//     const audioElement = audioRef.current;
//     audioElement.pause();
//     audioElement.currentTime = 0;
//     setIsPlaying(false);
//   };

//   const handleProgressChange = () => {
//     const progress = document.getElementById('progress');
//     const audioElement = audioRef.current;

//     const newTime = Math.floor((progress.value / 100) * audioElement.duration);
//     audioElement.currentTime = newTime;
//     setSecond(newTime);

//     if (newTime >= 60) {
//       const newMinutes = Math.floor(newTime / 60);
//       const newSeconds = newTime % 60;

//       setMinutes(newMinutes);
//       setSecond(newSeconds);
//     } else {
//       setMinutes(0);
//       setSecond(newTime);
//     }

//     if (!audioElement.paused) {
//       audioElement.play().catch((error) => {
//         console.error('Play failed:', error);
//       });
//     }
//   };

//   return (
//     <div className='bg-black text-white w-full flex justify-around flex-col  items-center fixed z- z-40   bottom-0 p-2 '>
//       <div className='flex flex-col w-[100%]'>
//         <div className='flex items-center justify-center gap-2'>
//           <p></p>
//           <input
//             type='range'
//             id='progress'
//             value={progressValue}
//             className='w-full bg-yellow-300 appearance-none  rounded-md overflow-hidden focus:outline-none'
//             onChange={(e) => setProgressValue(e.target.value)}
//             onMouseUp={handleProgressChange}
//             style={{
//               backgroundImage: `linear-gradient(90deg, #4CAF50 ${progressValue}%, #ddd ${progressValue}%)`,
//             }}
//           />
//           <p>0:00</p>
//         </div>
//       </div>

//       <audio
//         ref={audioRef}
//         id='audio-element'
//         src={songUrl}
//         onLoadedMetadata={(event) => {
//           const song = event.target;
//           setDuration(song.duration);
//         }}
//         onCanPlay={() => setPlay(!play)}
//       ></audio>

//       <div className='flex justify-between items-center w-full'>
//         <div className='hidden w-[20%] gap-3 md:flex lg:flex'>
//           <img src={img} className='w-[100px] rounded-md ' alt='Album Cover' />
//           <div className='flex flex-col'>
//             <h1 className='font-bold  text-white '>song : {name} </h1>
//             <h1 className='font-bold text-white'> singer : {singer}</h1>
//           </div>
//         </div>
//         <div className='mx-auto flex items-center justify-center gap-3 p-2'>
//           <button className=' p-4 hover:scale-95'>
//             <IoPlaySkipBackCircleSharp style={{ height: 30, width: 30 }} />
//           </button>
//           <button
//             className='bg-sky-500 rounded-full p-4 hover:scale-95'
//             onClick={handlePlayPause}
//           >
//             {play ? <FaPause /> : <FaPlay />}
//           </button>
//           <button className=' p-4 hover:scale-95'>
//             <BiSolidSkipNextCircle style={{ height: 30, width: 30 }} />
//           </button>
//         </div>
//         <div className='bg-black p-4 flex gap-2 items-center justify-center'>
//           <button
//             className='rounded-full p-4 hover:scale-95'
//             onClick={() => setFav(!fav)}
//           >
//             {fav ? (
//               <FaRegHeart style={{ color: 'pink', height: 30, width: 30 }} />
//             ) : (
//               <FaHeart style={{ color: 'pink', height: 30, width: 30 }} />
//             )}
//           </button>
//           <MdFormatListBulletedAdd style={{ color: 'skyblue', height: 30, width: 30 }} />
//         </div>
//       </div>

//       {/* Toast Container for displaying notifications */}
//       {/* <ToastContainer /> */}
//     </div>
//   );
// };

// export default PlayTrack;
