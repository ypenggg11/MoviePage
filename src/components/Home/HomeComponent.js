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

/* Component that fetch the popular movies from the API and pass the list to it child for render */
export const HomeComponent = () => {
  const [fetchUrl, setFetchUrl] = useState();

  const changeFetchUrlHandler = useCallback((url) => {
    setFetchUrl(url);
  }, []);

  /* If an error occurs (fetch fails...), show a fallback component instead of it childs */
  return (
    <ErrorBoundary fallback={<ErrorFallbackComponent />}>
      <div className="home-container">
        <SearchBarComponent onChange={changeFetchUrlHandler} />
        <Suspense fallback={<LoaderComponent />}>
          {fetchUrl && <MoviesListContainer fetchUrl={fetchUrl} />}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};
