import React from "react";

import MoviesList from "./MoviesList/MoviesList";
import PageNav from "../PageNav/PageNav";
import usePagination from "../../hooks/usePagination";

/* Component that display the movie list and a nav for move through pages */
const Movies = () => {
  /* Custom hook por pages handling */
  const { page, maxPages, prevPageHandler, nextPageHandler } = usePagination();

  return (
    <React.Fragment>
      <MoviesList page={page} maxPages={maxPages} />
      <PageNav
        page={page}
        onPageChangeToPrev={prevPageHandler}
        onPageChangeToNext={nextPageHandler}
      />
    </React.Fragment>
  );
};

export default Movies;
