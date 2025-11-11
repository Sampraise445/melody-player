/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable quotes */
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, activeSong, isPlaying, data }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    // 🔹 Normalize the song object so Redux always has a consistent structure
    const normalizedSong = {
      title: song.snippet.title,
      artist: song.snippet.channelTitle,
      images: {
        coverart:
          song.snippet.thumbnails?.high?.url ||
          song.snippet.thumbnails?.medium?.url ||
          song.snippet.thumbnails?.default?.url ||
          "https://via.placeholder.com/150",
      },
      id: song.id?.videoId || song.id, // works for YouTube ID
    };

    // 🔹 Dispatch the normalized song
    dispatch(setActiveSong({ song: normalizedSong, i, data }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // 🔹 Use normalized imageUrl for display
  const imageUrl =
    song.snippet.thumbnails?.high?.url ||
    song.snippet.thumbnails?.medium?.url ||
    song.snippet.thumbnails?.default?.url ||
    "https://via.placeholder.com/150";

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <img
          src={imageUrl}
          alt={song.snippet.title}
          className="w-full h-full rounded-lg object-cover"
        />
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.id === (song.id?.videoId || song.id)
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <Link to={`/songs/${song.id?.videoId || song.id}`}>
          <p className="text-lg font-semibold text-white truncate">
            {song.snippet.title}
          </p>
        </Link>

        <Link to={`/artists/${song.snippet.channelId}`}>
          <p className="text-sm text-gray-300 mt-1 truncate">
            {song.snippet.channelTitle}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SongCard;

