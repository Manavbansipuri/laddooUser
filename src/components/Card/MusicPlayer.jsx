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
    const rect = progressBarRef.current.getBoundingClientRect();
    const newTime = ((clientX - rect.left) / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleDragStart = (clientX) => {
    setIsSeeking(true);
    seekTo(clientX);
    document.addEventListener('mousemove', handleDragging);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleTouchDragging);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleDragging = (e) => seekTo(e.clientX);
  const handleDragEnd = (e) => {
    seekTo(e.clientX);
    setIsSeeking(false);
    document.removeEventListener('mousemove', handleDragging);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const handleTouchDragging = (e) => seekTo(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    seekTo(e.changedTouches[0].clientX);
    setIsSeeking(false);
    document.removeEventListener('touchmove', handleTouchDragging);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleSeekClick = (e) => seekTo(e.clientX);

  return (
    <div className="w-full h-16 bg-black px-4 py-4 flex items-center justify-between rounded-2xl shadow-lg border border-white/30 select-none">
      <div className="flex-1 pr-4">
        <h2 className="text-base font-bold text-white truncate">{title}</h2>

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
            {/* Enlarged invisible touch area */}
            <div
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 z-10"
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            >
              <div className="w-3 h-3 bg-red-400 rounded-full pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
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
