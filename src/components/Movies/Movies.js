import React from "react";

import MoviesList from "./MoviesList/MoviesList";
import PageNav from "../PageNav/PageNav";
import usePagination from "../../hooks/usePagination";

import styles from "./Movies.module.css";

/* Component that display the movie list and a nav for move through pages */
const Movies = () => {
  /* Custom hook por pages handling */
  const { page, maxPages } = usePagination();

  return (
    <div className={styles.movies}>
      <PageNav page={page} maxPages={maxPages} />
      <MoviesList page={page} maxPages={maxPages} />
    </div>
  );
};

export default Movies;
