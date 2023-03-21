import React, { useContext, Suspense, useState, useEffect } from "react";

import { getApiDefaultPath, getApiKey } from "../../services/api-config";

import { ErrorBoundary } from "react-error-boundary";
import ThemeContext from "../../store/theme-context";
import Loader from "../../UI/Loader";
import ErrorFallback from "../Error/ErrorFallback";
import useFetch from "../../hooks/useFetch";
import PaginationContext from "../../store/pagination-context";
import SearchBar from "../SearchBar/SearchBar";

const MoviesList = React.lazy(() => import("./MoviesList"));

/* Component that fetch the popular movies from the API and pass the list to it child for render */
const Movies = () => {
  const themeContext = useContext(ThemeContext);
  const { page } = useContext(PaginationContext);

  const [popularMovies, setPopularMovies] = useState([]);

  /* Custom hook for data fetch */
  const { data, isLoading } = useFetch(
    `${getApiDefaultPath()}movie/popular?api_key=${getApiKey()}&language=en-US&page=${page}`
  );

  /* Once the data was fetched successfully, update the popular movies state */
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

  /* If an error occurs (fetch fails...), show a fallback component instead of it childs */
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div
        className={`movies-container ${
          !themeContext.isDarkTheme ? "movies-container--light-theme" : ""
        }`}
      >
        <Suspense fallback={<Loader />}>
          <SearchBar />
          {!isLoading ? <MoviesList movies={popularMovies} /> : <Loader />}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default Movies;
