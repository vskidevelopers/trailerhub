import React from "react";
import { PlayCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import Truncate from "../utils/Truncate";

function MovieDetail({ movie }) {
  console.log("MOVIE >>", movie);
  return (
    <div className="relative -left-8 w-80 px-10 py-5 rounded-lg bg-slate-900 text-white ">
      <h2>{movie.title || movie.name}</h2>
      <div className="flex my-2 mx-2">
        <div className="w-1/2  flex items-center">
          <StarIcon className="w-4 h-4 text-yellow-500" />
          <h2 className="ml-2">{movie.vote_average}</h2>
        </div>
        <div className="w-1/2 flex justify-end">
          {movie.media_type ? (
            <div className="bg-yellow-700 w-max px-2 rounded-full">
              {" "}
              <h2>{movie.media_type || `movie`}</h2>
            </div>
          ) : null}
        </div>
      </div>
      <Truncate str={movie.overview} n="100" />
      <div>
        <h2>
          Rerelease_date :{" "}
          {movie.release_date ? movie.release_date : movie.first_air_date}
        </h2>
      </div>
      <div className="flex items-center cursor-pointer my-4">
        <PlayCircleIcon className="text-yellow-700 h-7 w-7" />{" "}
        <h1>watch trailer</h1>
      </div>
    </div>
  );
}

export default MovieDetail;
