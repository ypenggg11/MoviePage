import React, { useContext, useState } from "react";

import MoviesList from "./MoviesList";
import PageNav from "../PageNav/PageNav";
import usePagination from "../../hooks/usePagination";

import ThemeContext from "../../store/theme-context";

/* Component that display the movie list and a nav for move through pages */
const Movies = () => {
  /* Custom hook por pages handling */
  const { page, maxPages } = usePagination();
  const [slideType, setSlideType] = useState();
  const themeContext = useContext(ThemeContext);

  const slideChangeHandler = (type) => {
    setSlideType(type);
  };

  return (
    <div
      className={`movies-container ${
        !themeContext.isDarkTheme ? "movies-container--light-theme" : ""
      }`}
    >
      <PageNav
        page={page}
        maxPages={maxPages}
        onSlideChange={slideChangeHandler}
      />
      <MoviesList page={page} maxPages={maxPages} slide={slideType} />
    </div>
  );
};

export default Movies;
