import React, { useContext } from "react";

import PaginationContext from "../../store/pagination-context";
import { MovieCardComponent } from "./MovieCardComponent";

/* Component that renders each movie passed as prop as a MovieItem */
const MoviesListComponent = React.memo(({ movies }) => {
  const { slideType } = useContext(PaginationContext);

  /* Set the slide type style to the ul element
  (slide in from left or right) */
  let slide = slideType;

  if (slide === "left") {
    slide = "popular-movies__slide--left";
  } else if (slide === "right") {
    slide = "popular-movies__slide--right";
  }

  return (
    <React.Fragment>
      <ul className={`popular-movies ${slide && slide}`}>
        {movies.map((movie) => {
          return <MovieCardComponent movie={movie} key={movie.id} />;
        })}
      </ul>
    </React.Fragment>
  );
});

export default React.memo(MoviesListComponent);
