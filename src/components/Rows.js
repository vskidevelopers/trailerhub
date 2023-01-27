import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import MovieCard from "./MovieCard";

function Rows({ moviescategory, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await (await axios.get(fetchUrl)).data.results;
      setMovies(res);
    };

    fetchMovies();
    console.log("Movies >>", movies);
  }, []);

  return (
    <div className="text-white px-4">
      <div className="my-3 font-bold ">
        <h2>{moviescategory}</h2>
      </div>
      <div className="movieRow flex overflow-x-auto overflow-y-hidden">
        {movies.map((movie, i) => (
          // <div key={movie.id}>
          //   {movie?.title || movie?.name || movie?.original_name}
          // </div>
          <MovieCard movie={movie} key={movie.id} no={i} />
        ))}
      </div>
    </div>
  );
}

export default Rows;
