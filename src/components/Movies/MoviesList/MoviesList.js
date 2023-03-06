import React, { useState, useCallback, useEffect } from "react";

import styles from "./MoviesList.module.css";

import MovieItem from "./MovieItem/MovieItem";
import useFetch from "../../../hooks/useFetch";

const MoviesList = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);

  const updateMovies = useCallback(
    (data) => {
      props.onMaxPageChange(data.total_pages);

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
    [props]
  );

  const { fetchMovie } = useFetch();

  useEffect(() => {
    fetchMovie(
      `https://api.themoviedb.org/3/movie/popular?api_key=d301e50e3f3e231cf44323999a3b87d7&language=en-US&page=${props.page}`,
      updateMovies
    );
  }, [fetchMovie, updateMovies, props.page]);

  return (
    <ul className={styles.ul}>
      {popularMovies.map((movie) => {
        return <MovieItem movie={movie} key={movie.id} />;
      })}
    </ul>
  );
};

export default React.memo(MoviesList);
