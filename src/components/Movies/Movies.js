import React, {
  useContext,
  Suspense,
  useState,
  useEffect,
  useCallback,
} from "react";

import { addPageParam, getPopularMovies } from "../../services/api-config";

import { ErrorBoundary } from "react-error-boundary";
import ThemeContext from "../../store/theme-context";
import Loader from "../../UI/Loader";
import ErrorFallback from "../Error/ErrorFallback";
import useFetch from "../../hooks/useFetch";
import PaginationContext from "../../store/pagination-context";
import SearchBar from "../SearchBar/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const MoviesList = React.lazy(() => import("./MoviesList"));

/* Component that fetch the popular movies from the API and pass the list to it child for render */
const Movies = () => {
  const themeContext = useContext(ThemeContext);
  const { page, updateMaxPage } = useContext(PaginationContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [movies, setMovies] = useState([]);
  const [nothingWasFound, setNothingWasFound] = useState(false);
  const [fetchUrl, setFetchUrl] = useState(getPopularMovies());

  /* Custom hook for data fetch */
  const { data, isLoading } = useFetch(fetchUrl);

  useEffect(() => {
    let cancelled = false;

    if (!cancelled) {
      setFetchUrl((prevState) => {
        if (!prevState.includes("?page=")) {
          return addPageParam(prevState, page);
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [page]);

  /* Once the data was fetched successfully, update the popular movies state */
  useEffect(() => {
    if (data !== null) {
      if (!data.results.length > 0) {
        setNothingWasFound(true);
        updateMaxPage(1);

        return;
      }

      const movies = data.results.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          popularity: movie.popularity,
        };
      });

      setNothingWasFound(false);
      updateMaxPage(data.total_pages);

      setMovies(movies);
    }

    return () => {};
  }, [data, updateMaxPage]);

  const searchChangeHandler = useCallback(
    (requestUrl, searchQuery) => {
      setFetchUrl(requestUrl);

      localStorage.setItem("search", searchQuery ? searchQuery : "");
      navigate(pathname + "?page=" + 1, { replace: true });
    },
    [navigate, pathname]
  );

  /* If an error occurs (fetch fails...), show a fallback component instead of it childs */
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div
        className={`movies-container ${
          !themeContext.isDarkTheme ? "movies-container--light-theme" : ""
        }`}
      >
        <SearchBar onChange={searchChangeHandler} />
        <Suspense fallback={<Loader />}>
          {!isLoading ? (
            !nothingWasFound ? (
              <MoviesList movies={movies} />
            ) : (
              <Alert severity='warning' sx={{ margin: "2em" }}>
                Nothing was found
              </Alert>
            )
          ) : (
            <Loader />
          )}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default Movies;
