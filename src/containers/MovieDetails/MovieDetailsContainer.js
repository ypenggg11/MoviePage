import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { getImage, getMovieDetails } from "../../services/api-requests";

import { MovieDetailsComponent, LoaderComponent } from "../../components";

/* Fetch the movie id and show it details on screen */
const MovieDetailsContainer = () => {
  const [movie, setMovie] = useState();
  const navigate = useNavigate();
  const { movieId } = useParams();

  /* Set the movie object to show to the movie state */
  const addMovieToShow = useCallback((data) => {
    setMovie({
      title: data.title,
      poster_path: getImage(data.poster_path),
      backdrop_path: getImage(data.backdrop_path),
      homepage: data.homepage,
      genres: data.genres,
      vote_average: data.vote_average,
      overview: data.overview,
    });
  }, []);

  /* Custom hook */
  const { fetchData, isLoading, error } = useFetch();

  /* On mount, fetch the movie with the id passed with props */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData(getMovieDetails(movieId), addMovieToShow, { signal: signal });

    return () => {
      controller.abort();
    };
  }, [fetchData, addMovieToShow, movieId]);

  if (error) {
    navigate(-1);
  }

  return (
    <React.Fragment>
      {!isLoading && movie ? (
        <MovieDetailsComponent movie={movie} />
      ) : (
        <LoaderComponent />
      )}
    </React.Fragment>
  );
};

export default MovieDetailsContainer;
