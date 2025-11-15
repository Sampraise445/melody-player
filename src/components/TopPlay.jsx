import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({ song, i, data }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // DEBUG: Check the song object and thumbnails
  console.log(`TopChartCard ${i} song.snippet:`, song.snippet);
  console.log(`TopChartCard ${i} thumbnail URL:`, 
    song.snippet?.thumbnails?.high?.url,
    song.snippet?.thumbnails?.medium?.url,
    song.snippet?.thumbnails?.default?.url
  );

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const imageUrl = 
    song.snippet?.thumbnails?.high?.url ||
    song.snippet?.thumbnails?.medium?.url ||
    song.snippet?.thumbnails?.default?.url ||
    "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <img
        src={imageUrl}
        alt={song.snippet?.title || "Unknown Song"}
        className="w-16 h-16 rounded-lg"
      />
      <div className="flex flex-col justify-center ml-4 flex-1">
        <p className="text-white font-bold text-lg truncate">{song.snippet?.title}</p>
        <p className="text-gray-400 text-sm">{song.snippet?.channelTitle}</p>
      </div>
      <PlayPause
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};


const TopPlay = () => {
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Safely convert object → array
  // Safely get top 5 songs
const topPlays = data?.items?.slice(0, 5) || [];
console.log("TopPlays array:", topPlays);


  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 
      flex-1 xl:max-w-[500px] max-w-full flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Chart</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays.map((song, i) => (
            <TopChartCard
              key={song.id?.videoId || i}
              song={song}
              i={i}
              data={topPlays}
            />
          ))}
        </div>
      </div>


      <div className="w-full flex flex-col">
 <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold  text-2xl">Top Artist</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div> 
        <Swiper
  slidesPerView="auto"
  spaceBetween={15}
  freeMode
  centeredSlides
  centeredSlidesBounds
  modules={[FreeMode]}
  className="mt-4"
>
  
 {topPlays.map((song, i) => (
  <SwiperSlide
    key={song.id?.videoId || i}
    style={{ width: "25%", height: "auto" }}
    className="shadow-lg rounded-full animate-slideright"
  >
    <Link to={`/artists/${song.snippet?.channelId || "#"}`}>
    <img
  src={
    song.snippet?.thumbnails?.high?.url || 
    song.snippet?.thumbnails?.medium?.url || 
    song.snippet?.thumbnails?.default?.url || 
    "https://via.placeholder.com/150?text=No+Image"
  }
  alt={song.snippet?.channelTitle || "Unknown Artist"}
  className="rounded-full w-full object-cover"
/>



    </Link>
  </SwiperSlide>
))}


</Swiper>


      </div>
       
    </div>
  );
};

export default TopPlay;

