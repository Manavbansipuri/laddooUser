import React from "react";
import MusicPlayer from "./MusicPlayer"; // Adjust the import path as needed
import "./ScrollbarStyle.css"; // Import the CSS file for the scrollbar styles

const Card = ({ title, image, lyrics, song }) => {
  console.log("this is the image", image);
  // Function to replace newline characters with <br> tags
  const formatLyrics = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="w-full max-w-[600px] h-[90%] flex flex-col rounded-2xl overflow-hidden relative mx-auto">
      {/* Yellow section */}
      <div className="flex-[0.35] bg-amber-300 flex items-center justify-center rounded-t-2xl overflow-hidden">
        {/* Image covering the entire yellow section */}
        <img
          src={image}
          alt="Song Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* White section with text */}
      <div className="flex-[0.65] bg-green-400 flex items-center justify-center rounded-t-3xl mt-[-25px]">
        {/* Add custom-scrollbar class and overflow-y-auto for scrolling */}
        <div className="whitespace-normal text-center p-4 w-full h-[280px] overflow-y-auto custom-scrollbar">
          {/* Lyrics Section */}
          <div className="mt-4 mx-3" style={{ fontFamily: "'Courier Prime', monospace" }}>
            <h3 className="font-bold text-lg text-left">Lyrics:</h3>
            {/* Ensure text wraps and no horizontal scrollbar appears */}
            <p className="text-sm text-left break-words overflow-x-hidden">
              {lyrics ? formatLyrics(lyrics) : "No lyrics available."}
            </p>
          </div>
        </div>
      </div>

      {/* Music Player - Full width with responsive top positioning */}
      <div className="absolute top-[25%] sm:top-[20%] md:top-[25%] lg:top-[20%] xl:top-[20%] left-0 right-0 transform flex items-center text-white px-4 p-4 rounded-lg w-full">
        {/* Album Art */}
        <MusicPlayer song={song} title={title} />
      </div>
    </div>
  );
};

export default Card;