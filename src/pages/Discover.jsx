/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable react/jsx-closing-bracket-location */
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const Discover = () => {

const dispatch = useDispatch();

const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const genreTitle = 'Pop';

  if (isFetching) return <Loader title="Loading songs..." />;
  
  if (error) return <Error />;

  const songs = data?.items || []; // ✅ Correct array extraction

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {/* Heading */}
      <h2 className="font-bold text-3xl text-white mb-5 text-center">
        Discover {genreTitle}
      </h2>

      {/* Dropdown */}
      <select
        onChange={() => {}}
        value=""
        className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none"
      >
        {genres.map((genre) => (
          <option key={genre.value} value={genre.value}>
            {genre.title}
          </option>
        ))}
      </select>

      {/* Song Cards */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 mt-6">
        {songs.map((song, i) => (
          <SongCard
            key={song.id} // ✅ Use a unique id from YouTube data
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
