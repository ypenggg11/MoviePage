import React, { useContext, useState } from "react";

import usePagination from "../../hooks/usePagination";
import ThemeContext from "../../store/theme-context";

import { PaginationComponent } from "../../components";
import { PopularMoviesContainer } from "../../containers";

/* Component that display the movie list and a nav for move through pages */
export const HomeComponent = () => {
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
      <PaginationComponent
        page={page}
        maxPages={maxPages}
        onSlideChange={slideChangeHandler}
      />
      <PopularMoviesContainer page={page} maxPages={maxPages} slide={slideType} />
    </div>
  );
};