import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const MusicPlayer = ({ title, song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    audioRef.current = new Audio(song);
    const audio = audioRef.current;

    const updateDuration = () => setDuration(audio.duration);
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [song]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = (duration && currentTime) ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full h-16 bg-black px-4 py-4 flex items-center justify-between rounded-2xl shadow-lg border border-white/30 select-none">
      <div className="flex-1 pr-4">
        <h2 className="text-base font-bold text-white truncate">{title}</h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-1.5 rounded-full mt-1 relative">
          <div
            className="bg-red-400 h-1.5 rounded-full relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ pointerEvents: 'none' }}
            >
              <div className="w-4 h-4 bg-red-500 rounded-full pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Time Display */}
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
