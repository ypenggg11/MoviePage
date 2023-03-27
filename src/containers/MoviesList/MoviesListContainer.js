import React, { useState, useEffect, useContext } from "react";

import useFetch from "../../hooks/useFetch";

import { LoaderComponent, MoviesListComponent } from "../../components";
import PaginationContext from "../../store/pagination-context";
import { Alert } from "@mui/material";
import { addPageParam } from "../../services/api-requests";
import ThemeContext from "../../store/theme-context";


/* Component that renders each movie fetched from the API as a MovieItem */
const MoviesListContainer = ({ fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [nothingWasFound, setNothingWasFound] = useState(false);
  const { page, updateMaxPage } = useContext(PaginationContext);
  const themeContext = useContext(ThemeContext);

  /* Custom hook for data fetch */
  const { data, isLoading } = useFetch(addPageParam(fetchUrl, page));

  /* Once the data was fetched successfully, update the popular movies state */
  useEffect(() => {
    if (data !== null) {
      if (data.results.length < 1) {
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

  return (
    <div
        className={`movies-container ${
          !themeContext.isDarkTheme ? "movies-container--light-theme" : ""
        }`}
      >
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
    </div>
  );
};

export default React.memo(MoviesListContainer);
