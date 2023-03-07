import React, { useState, useCallback, useEffect } from "react";

import styles from "./MoviesList.module.css";

import MovieItem from "./MovieItem/MovieItem";
import useFetch from "../../../hooks/useFetch";

/* Component that renders each movie fetched from the API as a MovieItem */
const MoviesList = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);

  /* Update the popularMovies state with the API call response data */
  const updateMovies = useCallback(
    (data) => {
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
    },
    []
  );

  /* Custom hook */
  const { fetchMovie } = useFetch();

  /* On mount, fetch from API all popular movies */
  useEffect(() => {
    if (props.page <= props.maxPages) {
      fetchMovie(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIES_API_KEY}language=en-US&page=${props.page}`,
        updateMovies
      );
    }

    return () => {};
  }, [fetchMovie, updateMovies, props]);

  return (
    <ul className={styles.ul}>
      {popularMovies.map((movie) => {
        return <MovieItem movie={movie} key={movie.id} page={props.page}/>;
      })}
    </ul>
  );
};

export default React.memo(MoviesList);
