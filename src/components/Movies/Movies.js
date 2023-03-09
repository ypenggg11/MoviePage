import React, {useState} from "react";

import MoviesList from "./MoviesList/MoviesList";
import PageNav from "../PageNav/PageNav";
import usePagination from "../../hooks/usePagination";

import styles from "./Movies.module.css";

/* Component that display the movie list and a nav for move through pages */
const Movies = () => {
  /* Custom hook por pages handling */
  const { page, maxPages } = usePagination();
  const [slideType, setSlideType] = useState();

  const slideChangeHandler = (type) => {
    setSlideType(type);
  };

  return (
    <div className={styles.movies}>
      <PageNav page={page} maxPages={maxPages} onSlideChange={slideChangeHandler} />
      <MoviesList page={page} maxPages={maxPages} slide={slideType}  />
    </div>
  );
};

export default Movies;
