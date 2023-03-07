import React, { useState, useEffect, useCallback } from "react";

import styles from "./MovieDetail.module.css";

import useFetch from "../../hooks/useFetch";
import Detail from "./Detail";
import ImageDisplay from "./ImageDisplay";

/* Fetch the movie id and show it details on screen */
const MovieDetail = (props) => {
  const [movie, setMovie] = useState();

  /* Set the movie object to show to the movie state */
  const addMovieToShow = useCallback((data) => {
    setMovie({
      title: data.title,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      homepage: data.homepage,
      genres: data.genres,
      popularity: data.popularity,
      overview: data.overview,
    });
  }, []);

  /* Custom hook */
  const { fetchMovie } = useFetch();

  /* On mount, fetch the movie with the id passed with props */
  useEffect(() => {
    fetchMovie(
      `https://api.themoviedb.org/3/movie/${props.movieId}?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
      addMovieToShow
    );
  }, [fetchMovie, addMovieToShow, props.movieId]);

  return (
    <React.Fragment>
      {movie && (
        <div className={styles["detail-view"]}>
          <div
            className={styles.background}
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            }}
          ></div>
          <div className={styles.container}>
            <ImageDisplay
              image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              homepage={movie.homepage}
            />
            <Detail movie={movie} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(MovieDetail);
