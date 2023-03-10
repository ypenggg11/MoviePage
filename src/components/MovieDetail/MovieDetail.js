import React, { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Detail from "./Detail";
import ImageDisplay from "./ImageDisplay";
import Loader from "../../UI/Loader";

/* Fetch the movie id and show it details on screen */
const MovieDetail = ({movieId}) => {
  const [movie, setMovie] = useState();
  const navigate = useNavigate();

  /* Set the movie object to show to the movie state */
  const addMovieToShow = useCallback((data) => {
    setMovie({
      title: data.title,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      homepage: data.homepage,
      genres: data.genres,
      vote_average: data.vote_average,
      overview: data.overview,
    });
  }, []);

  /* Custom hook */
  const { fetchMovie, isLoading, error } = useFetch();

  /* On mount, fetch the movie with the id passed with props */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchMovie(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
      addMovieToShow,
      signal
    );

    return () => {
      controller.abort();
    };
  }, [fetchMovie, addMovieToShow, movieId]);

  if (error) {
    navigate(-1);
  }

  return (
    <React.Fragment>
      {!isLoading && movie ? (
        <div
          className="movie-detail__background"
          style={{
            backgroundImage: `linear-gradient(
              to bottom,
              rgb(0 0 0 / 0.9),
              rgb(0 0 0 / 0.6)
            ), url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          }}
        >
          <div className="movie-detail__container">
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
