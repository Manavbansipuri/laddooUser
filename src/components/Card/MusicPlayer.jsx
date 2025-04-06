import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const MusicPlayer = ({ title, song }) => {
  const audioRef = useRef(new Audio(song));
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const updateDuration = () => setDuration(audio.duration);
    const updateTime = () => {
      if (!isSeeking) setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [isSeeking]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const seekTo = (clientX) => {
    const progress = progressBarRef.current;
    const rect = progress.getBoundingClientRect();
    const newTime = ((clientX - rect.left) / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMouseDown = () => {
    setIsSeeking(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    seekTo(e.clientX);
  };

  const handleMouseUp = (e) => {
    seekTo(e.clientX);
    setIsSeeking(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleSeekClick = (e) => {
    seekTo(e.clientX);
  };

  return (
    <div className="w-full h-16 bg-black px-4 py-4 flex items-center justify-between rounded-2xl shadow-lg border border-white/30">
      <div className="flex-1">
        <h2 className="text-base font-bold text-white">{title}</h2>

        {/* Progress Bar */}
        <div
          className="w-full bg-gray-700 h-1.5 rounded-full mt-1 relative cursor-pointer"
          ref={progressBarRef}
          onClick={handleSeekClick}
        >
          <div
            className="bg-red-400 h-1.5 rounded-full relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div
              className="w-6 h-6 rounded-full absolute -right-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center"
              onMouseDown={handleMouseDown}
            >
              <div className="w-3 h-3 bg-red-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-xs text-gray-400 flex justify-between mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center">
        <button
          className="p-3 bg-white text-black rounded-full flex items-center justify-center"
          onClick={togglePlayPause}
        >
          {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
