import { useState, useEffect, useRef, useCallback } from 'react';
import { setNextIndex,setPrevIndex } from '../../slices/album';
import {
  setName,
  setSinger,
  setSongUrl,
  settrackId,
  setImg,
} from '../../slices/player';
// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  setTrackIndex,
  setCurrentTrack,
}) => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const trackIndex = useSelector((state)=> state.Album.trackIndex);
  const song = useSelector((state)=> state.Album.Songs);
  
  const title = useSelector((state) => state.Player.name);
  

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // const handleNext = () => {
  //   if (trackIndex >= tracks.length - 1) {
  //     setTrackIndex(0);
  //     setCurrentTrack(tracks[0]);
  //   } else {
  //     setTrackIndex((prev) => prev + 1);
  //     setCurrentTrack(tracks[trackIndex + 1]);
  //   }
  // };


  const playAnimationRef = useRef();
 
  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat,trackIndex,title]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
    if(song && song.length > 0){

      dispatch(setImg(song[trackIndex].Image));
      dispatch(setSongUrl(song[trackIndex].Url));
      dispatch(setName(song[trackIndex].Name));
      dispatch(setSinger(song[trackIndex].Artists[0]));
      dispatch(settrackId(song[trackIndex]._id));
    }
    // setPlay(true);
    console.log("this is index",trackIndex);
  }, [volume, audioRef, muteVolume,trackIndex]);

  return (
    <div className="controls-wrapper text-white flex  border border-black  items-center ">
      <div className="flex px-4 gap-3 ">
        <button onClick={()=> dispatch(setPrevIndex(1))}>
          <IoPlaySkipBackSharp style={{ height: 20, width: 20 }} />
        </button>
        <button onClick={skipBackward}>
          <IoPlayBackSharp style={{ height: 20, width: 20 }} />
        </button>

        <button className='bg-sky-500 rounded-full p-4 hover:scale-95' onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp style={{ height: 20, width: 20 }}/> : <IoPlaySharp style={{ height: 20, width: 20 }}/>}
        </button>
        <button onClick={skipForward}>
          <IoPlayForwardSharp style={{ height: 20, width: 20 }}/>
        </button>
        <button onClick={()=> dispatch(setNextIndex(1))}>
          <IoPlaySkipForwardSharp style={{ height: 20, width: 20 }}/>
        </button>
      </div>
      <div className="flex items-center justify-center">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff style={{ height: 20, width: 20 }}/>
          ) : volume < 40 ? (
            <IoMdVolumeLow style={{ height: 20, width: 20 }}/>
          ) : (
            <IoMdVolumeHigh style={{ height: 20, width: 20 }}/>
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Controls;