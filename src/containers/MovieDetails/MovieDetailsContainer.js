import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { getImageUrl, getMovieDetailsUrl } from "../../services/api-requests";
import { MovieDetailsComponent, LoaderComponent } from "../../components";

/* Fetch a movie with the id on the params, and renders a component that displays the fetched details */
export const MovieDetailsContainer = () => {
  const [movie, setMovie] = useState();
  const { movieId } = useParams();

  /* Fetch the movie based on the movie id */
  const { data, isLoading } = useFetch(getMovieDetailsUrl(movieId));

  /* Update the movie state when data it's available */
  useEffect(() => {
    if (data !== null) {
      setMovie({
        id: data.id,
        title: data.title,
        poster_path: getImageUrl(data.poster_path),
        backdrop_path: getImageUrl(data.backdrop_path),
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