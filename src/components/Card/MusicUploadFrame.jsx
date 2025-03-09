import React from "react";
import NavBar from "../NavBar/NavBar";
import Card from "./Card";
import { useSongs } from "../Context/SongsContext"; // Adjust the import path as needed
import { API_URL } from "../Constant/constants"; // Import API_URL for proper path resolution
import Loading from "../Loading/Loading";
import WelcomeCard from "./FirstCard/WelcomeCard";

const MusicUploadForm = () => {
  const { songs, loading } = useSongs();

  if (loading) {
    return <div><Loading /></div>; // Show a loading state while data is being fetched
  }

  return (
    <div className="w-full h-full bg-light-blue text-white flex flex-col">
      {/* NavBar at the top */}
      <NavBar />

      {/* Horizontally Scrollable Cards Container */}
      <div className="w-full flex overflow-x-auto space-x-7 mx-5 my-10 scrollbar-hide">

          {/* Welcome Card (Always First) */}
          <div className="flex-shrink-0 w-[300px] h-full">
            <WelcomeCard />
          </div>

        {/* Render Songs in Reverse Order */}
        {[...songs].reverse().map((song, index) => (
          <div key={index} className="flex-shrink-0 w-[300px]">
            <Card
              title={song.title}
              image={`${API_URL}/${song.image.replace(/\\/g, "/")}`} // Fix backslashes for correct path
              lyrics={song.lyrics}
              song={`${API_URL}/${song.songFile.replace(/\\/g, "/")}`} // Fix backslashes for correct path
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicUploadForm;
