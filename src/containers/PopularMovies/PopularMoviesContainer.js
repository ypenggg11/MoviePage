import React, { useState, useCallback, useEffect } from "react";

import useFetch from "../../hooks/useFetch";
import { getPopularMovies } from "../../services/api-requests";

import { LoaderComponent, PopularMoviesComponent } from "../../components";

/* Component that renders each movie fetched from the API as a MovieItem */
export const PopularMoviesContainer = React.memo((props) => {
  const [popularMovies, setPopularMovies] = useState([]);

  /* Update the popularMovies state with the API call response data */
  const updateMovies = useCallback((data) => {
    const movies = data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        popularity: movie.popularity,
      };
    });

    setPopularMovies(movies);
  }, []);

  /* Custom hook */
  const { fetchData, isLoading } = useFetch();

  /* On mount, fetch from API all popular movies */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (props.page <= props.maxPages && props.page >= 1) {
      fetchData(getPopularMovies(props.page), updateMovies, { signal: signal });
    }

    return () => {
      controller.abort();
    };
  }, [fetchData, updateMovies, props.page, props.maxPages]);

  return (
    <React.Fragment>
      {!isLoading ? (
        <PopularMoviesComponent
          movies={popularMovies}
          slideType={props.slide}
        />
      ) : (
        <LoaderComponent />
      )}
    </React.Fragment>
  );
});
