import React, { useContext, Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import ThemeContext from "../../store/theme-context";

import {LoaderComponent, ErrorFallbackComponent} from "../../components";

export const PopularMoviesContainer = React.lazy(() =>
  import("../../containers/PopularMovies/PopularMoviesContainer")
);

/* Component that fetch the popular movies from the API and pass the list to it child for render */
export const HomeComponent = () => {
  const themeContext = useContext(ThemeContext);

  /* If an error occurs (fetch fails...), show a fallback component instead of it childs */
  return (
    <ErrorBoundary fallback={<ErrorFallbackComponent />}>
      <div
        className={`movies-container ${
          !themeContext.isDarkTheme ? "movies-container--light-theme" : ""
        }`}
      >
        <Suspense fallback={<LoaderComponent />}>
          <PopularMoviesContainer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};