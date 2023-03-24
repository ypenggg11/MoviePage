import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { getImage, getMovieDetails } from "../../services/api-requests";
import { MovieDetailsComponent, LoaderComponent } from "../../components";

/* Fetch the movie id and show it details on screen */
export const MovieDetailsContainer = () => {
  const [movie, setMovie] = useState();
  const { movieId } = useParams();

  /* Fetch the movie based on the movie id */
  const { data, isLoading } = useFetch(getMovieDetails(movieId));

  /* Update the movie state when data it's available */
  useEffect(() => {
    if (data !== null) {
      setMovie({
        id: data.id,
        title: data.title,
        poster_path: getImage(data.poster_path),
        backdrop_path: getImage(data.backdrop_path),
        homepage: data.homepage,
        genres: data.genres,
        vote_average: data.vote_average,
        overview: data.overview,
      });
    }
  }, [data]);

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