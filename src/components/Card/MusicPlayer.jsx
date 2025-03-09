import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const MusicPlayer = ({ title, song }) => {
  const audioRef = useRef(new Audio(song)); // Create an audio element
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    // Update song duration when metadata loads
    const updateDuration = () => setDuration(audio.duration);
    audio.addEventListener('loadedmetadata', updateDuration);

    // Update current time when song plays
    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  // Play or Pause the song
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Format time in mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full h-16 bg-black px-4 py-4 flex items-center justify-between rounded-2xl shadow-lg border border-white/30">
      {/* Song Title & Progress Bar */}
      <div className="flex-1">
        <h2 className="text-base font-bold text-white">{title}</h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-1.5 rounded-full mt-1 relative">
          <div
            className="bg-red-400 h-1.5 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>

        {/* Timer Display */}
        <div className="text-xs text-gray-400 flex justify-between mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play/Pause Button */}
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