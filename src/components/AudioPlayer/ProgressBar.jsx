import { useEffect } from "react";
import { setNextIndex,setPrevIndex } from '../../slices/album';
import { useDispatch } from "react-redux";
const ProgressBar = ({
    progressBarRef,
    audioRef,
    timeProgress,
    duration,
  }) => {
    const dispatch  = useDispatch();
    const handleProgressChange = () => {
      audioRef.current.currentTime = progressBarRef.current.value;
    };

    useEffect(() => {
      if(timeProgress == duration){
        dispatch(setNextIndex(1));
        console.log("gana khatm ho gya");
      }
    }, [timeProgress])
    
  
    const formatTime = (time) => {
      if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const formatMinutes =
          minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(time % 60);
        const formatSeconds =
          seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatMinutes}:${formatSeconds}`;
      }
      return '00:00';
    };
  
    return (
      <div className="flex  items-center justify-center text-white gap-2">
        <span className="time current">{formatTime(timeProgress)}</span>
        <input
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>
    );
  };
  
  export default ProgressBar;