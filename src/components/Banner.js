import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import requests from "../utils/requests";

function Banner() {
  const [movie, setMovie] = useState([]);

  const getRandomMovie = (list) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await (await axios.get(requests.fetchTopRated)).data.results;
      const randomMovie = getRandomMovie(res);

      setMovie(randomMovie);
      // return randomMovie
    };
    fetchMovie();
  }, []);

  return (
    <div
      className="h-96 bg-cyan-900 bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(
                        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                        )`,
      }}
    >
      <div className="flex flex-col p-8 justify-around h-4/5 w-3/4">
        {/* Title */}
        <div>
          <h1 className="text-5xl font-medium">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
        </div>

        {/* buttons */}
        <div className="text-xl">
          <button className=" bg-[rgba(51,51,51,0.5)] py-2 px-3 font-bold  mr-2 hover:bg-white hover:text-[#33333380]">
            Play
          </button>
          <button className="bg-[rgba(51,51,51,0.5)] py-2 px-3 font-bold   hover:bg-white hover:text-[#33333380]">
            My List
          </button>
        </div>

        {/* Description */}
        <div className="w-4/5">{truncate(movie?.overview, 150)}</div>
      </div>

      <div className="h-1/5 bg-gradient-to-t from-[#111] to-[rgba(37, 37, 37, 0.612)]"></div>
    </div>
  );
}

export default Banner;
