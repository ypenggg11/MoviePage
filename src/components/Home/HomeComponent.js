import React, { useContext, Suspense, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";
import ThemeContext from "../../store/theme-context";

import {LoaderComponent, ErrorFallbackComponent} from "../../components";
import MoviesListContainer from "../../containers/MoviesList/MoviesListContainer";
import PaginationContext from "../../store/pagination-context";
import SearchBarComponent from "../SearchBar/SearchBarComponent";
import { addPageParam } from "../../services/api-requests";

export const PopularMoviesContainer = React.lazy(() =>
  import("../../containers/MoviesList/MoviesListContainer")
);

/* Component that fetch the popular movies from the API and pass the list to it child for render */
export const HomeComponent = () => {
  const themeContext = useContext(ThemeContext);
  const {page} = useContext(PaginationContext);
  const [fetchUrl, setFetchUrl] = useState();

  const changeFetchUrlHandler = (url) => {
    setFetchUrl(addPageParam(url, page));
  };

  /* If an error occurs (fetch fails...), show a fallback component instead of it childs */
  return (
    <ErrorBoundary fallback={<ErrorFallbackComponent />}>
      <div
        className={`movies-container ${
          !themeContext.isDarkTheme ? "movies-container--light-theme" : ""
        }`}
      >
        <SearchBarComponent onChange={changeFetchUrlHandler}/>
        <Suspense fallback={<LoaderComponent />}>
          <MoviesListContainer fetchUrl={fetchUrl}/>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};