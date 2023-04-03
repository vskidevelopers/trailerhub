import React, { useState, useEffect } from "react";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import axios from "../utils/axios";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";

function Rows({ moviescategory, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  console.log("hoveredMovie >>", hoveredMovie);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await (await axios.get(fetchUrl)).data.results;
      setMovies(res);
    };

    fetchMovies();
    console.log("Movies >>", movies);
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

  const removeMovieTrailer = () => {
    if (trailerUrl) {
      setTrailerUrl("");
    }
  };

  function handleMovieHover(movie) {
    setHoveredMovie(movie);
    console.log("SetHovered >>", hoveredMovie);
  }

  function handleMouseLeave() {
    setHoveredMovie(null);
  }

  return (
    <div className="text-white px-4">
      <div className="my-3 font-bold ">
        <h2>{moviescategory}</h2>
      </div>
      <div className="movieRow flex overflow-x-auto ">
        {movies.map((movie, i) => (
          // <div key={movie.id}>
          <div
            className="flex w-auto mb-2 mr-3"
            onMouseEnter={() => handleMovieHover(movie)}
            onMouseLeave={handleMouseLeave}
            onClick={removeMovieTrailer}
          >
            <MovieCard movie={movie} key={movie.id} no={i} />
            {hoveredMovie && hoveredMovie.id === movie.id && (
              <div
                className={`opacity-0 transition-opacity ${
                  hoveredMovie ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => handleTrailers(movie)}
              >
                <MovieDetail movie={movie} />{" "}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}</div>
    </div>
  );
}

export default Rows;
