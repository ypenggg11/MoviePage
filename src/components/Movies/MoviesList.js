import React, { useContext } from "react";

import MovieItem from "./MovieItem";
import PaginationContext from "../../store/pagination-context";

/* Component that renders each movie fetched from the API as a MovieItem */
const MoviesList = ({ movies }) => {
  const { slideType } = useContext(PaginationContext);

  let slide = slideType;

  if (slide === "left") {
    slide = "movies-list__slide--left";
  } else if (slide === "right") {
    slide = "movies-list__slide--right";
  }

  return (
    <React.Fragment>
      <ul className={`movies-list ${slide && slide}`}>
        {movies.map((movie) => {
          return <MovieItem movie={movie} key={movie.id} />;
        })}
      </ul>
    </React.Fragment>
  );
};

export default React.memo(MoviesList);
