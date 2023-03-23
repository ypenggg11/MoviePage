import React from "react";

import MovieCardComponent from "./MovieCardComponent";

/* Component that renders each movie fetched from the API as a MovieItem */
const PopularMoviesComponent = ({ movies, slideType }) => {
  let slide = slideType;

  if (slide === "left") {
    slide = "popular-movies__slide--left";
  } else if (slide === "right") {
    slide = "popular-movies__slide--right";
  }

  return (
    <ul className={`popular-movies ${slide && slide}`}>
      {movies.map((movie) => {
        return <MovieCardComponent movie={movie} key={movie.id} />;
      })}
    </ul>
  );
};

export default React.memo(PopularMoviesComponent);
