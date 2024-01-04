import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsMusicNoteBeamed } from 'react-icons/bs';

import { setNextIndex,setPrevIndex } from '../../slices/album';

const MobilePlayer = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
   const dispatch = useDispatch();
    const title = useSelector((state) => state.Player.name);
  const author = useSelector((state) => state.Player.singer);
  const src = useSelector((state) => state.Player.songurl);
  const thumbnail = useSelector((state) => state.Player.img);
  
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  useEffect(()=>{},currentTrack,title);

  return (
    <div className='  bg-cover bg-no-repeat   ' 
     style={{ backgroundImage: `url(${thumbnail})` }}
    >
      <audio
        src={src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={()=> dispatch(setNextIndex(1))}
      />
      <div className=" flex items-center flex-col justify-center gap-2 w-full h-[400px]  backdrop-blur-sm ">
        <div className="audio-image">
          {currentTrack.thumbnail ? (
            <img src={thumbnail} alt="audio avatar" className='w-[200px] h-[200px]' />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text-white font-bold">
          <p className="title">Song : {title}</p>
          <p>Artist : {author}</p>
        </div>
      </div>
    </div>
  );
};
export default MobilePlayer;
