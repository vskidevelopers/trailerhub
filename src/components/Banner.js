import React, { useEffect, useState } from "react";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import axios from "../utils/axios";
import requests from "../utils/requests";
import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

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

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    },
  };

  const handleTrailers = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div
      className=" h-96 md:h-[32rem] bg-cyan-900 bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(
                        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                        )`,
      }}
    >
      <div className="absolute inset-0 bg-black/15"></div>
      <div className="flex flex-col justify-end md:justify-end h-4/5 w-full md:w-3/4 mx-2 ">
        {/* Title */}
        <div className="pt-10 md:p-0">
          <h1 className="text-3xl md:text-5xl font-medium pt-3">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
        </div>

        {/* buttons */}
        <div className="text-xl my-2 z-50 w-max">
          <button
            onClick={() => handleTrailers(movie)}
            className={`cursor-pointer ${
              trailerUrl ? "bg-transparent text-2xl" : "text-yellow-400"
            }  font-bold  mr-2 hover:text-white`}
          >
            {trailerUrl ? (
              <>
                <StopIcon className="w-16 md:w-32 h-16 md:h-32" />
              </>
            ) : (
              <div className="flex items-center">
                <PlayIcon className="w-16 md:w-32 h-16 md:h-32" />
                <h2 className="text-white">Play Trailer</h2>
              </div>
            )}
          </button>
        </div>

        {/* Description */}
        <div className="w-4/5">{truncate(movie?.overview, 150)}</div>
      </div>
      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={opts}
          className="absolute top-0 w-full"
        />
      )}

      <div className="h-1/5 bg-gradient-to-t from-[#111] to-[rgba(37, 37, 37, 0.612)]"></div>
    </div>
  );
}

export default Banner;
