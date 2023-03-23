import React from "react";

import DetailsCardComponent from "./DetailsCardComponent";
import MoviePosterComponent from "./MoviePosterComponent";

/* Fetch the movie id and show it details on screen */
const MovieDetailsComponent = ({ movie }) => {

  return (
    <div
      className='movie-detail__background'
      style={{
        backgroundImage: `linear-gradient(
              to bottom,
              rgb(0 0 0 / 0.9),
              rgb(0 0 0 / 0.6)
            ), url(${movie.backdrop_path})`,
      }}
    >
      <div className='movie-detail__container'>
        <MoviePosterComponent
          image={movie.poster_path}
          alt={movie.title}
          homepage={movie.homepage}
        />
        <DetailsCardComponent movie={movie} />
      </div>
    </div>
  );
};

export default MovieDetailsComponent;
