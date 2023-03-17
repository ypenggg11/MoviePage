import React, { useContext, Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import ThemeContext from "../../store/theme-context";
import Loader from "../../UI/Loader";
import ErrorFallback from "../Error/ErrorFallback";
import PaginationContext from "../../store/pagination-context";

const MoviesList = React.lazy(() => import("./MoviesList"));

/* Component that display the movie list and a nav for move through pages */
const Movies = () => {
  /* Custom hook por pages handling */
  const { page, maxPages, slideType } = useContext(PaginationContext);
  const themeContext = useContext(ThemeContext);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div
        className={`movies-container ${
          !themeContext.isDarkTheme ? "movies-container--light-theme" : ""
        }`}
      >
        <Suspense fallback={<Loader />}>
          <MoviesList page={page} maxPages={maxPages} slide={slideType} />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default Movies;
