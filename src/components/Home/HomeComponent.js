import React, { Suspense, useState, useCallback } from "react";

import { ErrorBoundary } from "react-error-boundary";

import {
  LoaderComponent,
  ErrorFallbackComponent,
  SearchBarComponent,
} from "../../components";

export const MoviesListContainer = React.lazy(() =>
  import("../../containers/MoviesList/MoviesListContainer")
);

/* Home component that renders the main content of the page and handle it errors */
export const HomeComponent = () => {
  const [fetchUrl, setFetchUrl] = useState();

  /* Handles the search bar changes and updates our fetch url */
  const changeFetchUrlHandler = useCallback((url) => {
    setFetchUrl(url);
  }, []);

  /* If an error occurs (fetch fails...), show a fallback component instead of it childs */
  return (
    <ErrorBoundary fallback={<ErrorFallbackComponent />}>
      <div className='home-container'>
        {/* Search bar */}
        <SearchBarComponent onChange={changeFetchUrlHandler} />
        <Suspense fallback={<LoaderComponent />}>
          {/* Main content */}
          {fetchUrl && <MoviesListContainer fetchUrl={fetchUrl} />}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};
