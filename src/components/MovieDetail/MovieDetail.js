import React, { useState, useEffect, useCallback } from "react";

import styles from "./MovieDetail.module.css";

import useFetch from "../../hooks/useFetch";
import Detail from "./Detail";
import ImageDisplay from "./ImageDisplay";
import Loader from "../../UI/Loader/Loader";

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
  const { fetchMovie, isLoading } = useFetch();

  /* On mount, fetch the movie with the id passed with props */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchMovie(
      `https://api.themoviedb.org/3/movie/${props.movieId}?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
      addMovieToShow,
      signal
    );

    return () => {
      controller.abort();
    };
  }, [fetchMovie, addMovieToShow, props.movieId]);

  return (
    <React.Fragment>
      {!isLoading && movie ? (
        <div
          className={styles.background}
          style={{
            backgroundImage: `linear-gradient(
              to bottom,
              rgb(0 0 0 / 0.9),
              rgb(0 0 0 / 0.6)
            ), url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          }}
        >
          <div className={styles.container}>
            <ImageDisplay
              image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              homepage={movie.homepage}
            />
            <Detail movie={movie} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default React.memo(MovieDetail);
