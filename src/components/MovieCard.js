import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Truncate from "../utils/Truncate";

function MovieCard({ movie, no }) {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const imageUrl = `${baseUrl}${movie.poster_path}`;

  return (
    <>
      <div className="flex flex-col justify-end bg-gray-800 max-h-60">
        <span className="mb-2">
          <h4
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            <Truncate str={movie.title || movie.name} n="21" />
            {/* {movie.title || movie.name} */}
          </h4>
        </span>
        <span>
          <h1 className="font-bold">{no + 1}</h1>
        </span>
      </div>

      <div className="">
        <LazyLoadImage
          className="h-[240px] max-w-xs"
          src={imageUrl}
          alt="..."
        />
      </div>
    </>
  );
}

export default MovieCard;
