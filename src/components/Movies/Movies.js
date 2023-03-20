import React, { useContext, Suspense, useState, useEffect } from "react";

import { getApiDefaultPath, getApiKey } from "../../services/api-config";

import { ErrorBoundary } from "react-error-boundary";
import ThemeContext from "../../store/theme-context";
import Loader from "../../UI/Loader";
import ErrorFallback from "../Error/ErrorFallback";
import useFetch from "../../hooks/useFetch";
import PaginationContext from "../../store/pagination-context";

const MoviesList = React.lazy(() => import("./MoviesList"));

/* Component that display the movie list and a nav for move through pages */
const Movies = () => {
  /* Custom hook por pages handling */
  const themeContext = useContext(ThemeContext);
  const { page } = useContext(PaginationContext);

  const [popularMovies, setPopularMovies] = useState([]);

  const { data, isLoading } = useFetch(
    `${getApiDefaultPath()}movie/popular?api_key=${getApiKey()}&language=en-US&page=${page}`
  );

  useEffect(() => {
    if (data !== null) {
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
    }
  }, [data]);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div
        className={`movies-container ${
          !themeContext.isDarkTheme ? "movies-container--light-theme" : ""
        }`}
      >
        <Suspense fallback={<Loader />}>
          {!isLoading ? <MoviesList movies={popularMovies} /> : <Loader />}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default Movies;
