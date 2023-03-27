import React, { useContext } from "react";

import PaginationContext from "../../store/pagination-context";
import { MovieCardComponent } from "./MovieCardComponent";

/* Component that renders each movie passed as prop as a MovieItem */
export const MoviesListComponent = React.memo(({ movies }) => {
  const { slideType } = useContext(PaginationContext);

  /* Set the slide type style to the ul element
  (slide in from left or right) */
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
          return <MovieCardComponent movie={movie} key={movie.id} />;
        })}
      </ul>
    </React.Fragment>
  );
});