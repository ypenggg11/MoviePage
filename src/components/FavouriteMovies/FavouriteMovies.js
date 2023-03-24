import React, { useContext, Suspense, useState, useEffect } from "react";

import { addPageParam, getFavouriteMovies } from "../../services/api-requests";

import { ErrorBoundary } from "react-error-boundary";
import ThemeContext from "../../store/theme-context";
import useFetch from "../../hooks/useFetch";
import PaginationContext from "../../store/pagination-context";
import { Alert } from "@mui/material";
import AuthContext from "../../store/auth-context";

import { LoaderComponent, ErrorFallbackComponent } from "../../components";
import MoviesListComponent from "../MoviesList/MoviesListComponent";

/* Component that fetch the popular movies from the API and pass the list to it child for render */
const FavouriteMovies = () => {
  const themeContext = useContext(ThemeContext);
  const authContext = useContext(AuthContext);
  const { page, updateMaxPage } = useContext(PaginationContext);

  const [movies, setMovies] = useState([]);
  const [nothingWasFound, setNothingWasFound] = useState(false);

  /* Custom hook for data fetch */
  const { data, isLoading } = useFetch(
    addPageParam(getFavouriteMovies(authContext.sessionId), page)
  );

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

  /* If an error occurs (fetch fails...), show a fallback component instead of it childs */
  return (
    <ErrorBoundary fallback={<ErrorFallbackComponent />}>
      <div
        className={`movies-container ${
          !themeContext.isDarkTheme ? "movies-container--light-theme" : ""
        }`}
      >
        <Suspense fallback={<LoaderComponent />}>
          {!isLoading ? (
            !nothingWasFound ? (
              <MoviesListComponent movies={movies} />
            ) : (
              <Alert severity='warning' sx={{ margin: "2em" }}>
                Nothing was found
              </Alert>
            )
          ) : (
            <LoaderComponent />
          )}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default FavouriteMovies;
