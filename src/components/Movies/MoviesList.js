import React, { useState, useCallback, useEffect } from "react";

import MovieItem from "./MovieItem";
import useFetch from "../../hooks/useFetch";
import Loader from "../../UI/Loader";

/* Component that renders each movie fetched from the API as a MovieItem */
const MoviesList = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);

  /* Update the popularMovies state with the API call response data */
  const updateMovies = useCallback((data) => {
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
  }, []);

  /* Custom hook */
  const { fetchGet, isLoading } = useFetch();

  /* On mount, fetch from API all popular movies */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (props.page <= props.maxPages && props.page >= 1) {
      fetchGet(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIES_API_KEY}language=en-US&page=${props.page}`,
        updateMovies,
        signal
      );
    }

    return () => {
      controller.abort();
    };
  }, [fetchGet, updateMovies, props.page, props.maxPages]);

  let slideType = props.slide;

  if (slideType === "left") {
    slideType = "movies-list__slide--left";
  } else if (slideType === "right") {
    slideType = "movies-list__slide--right";
  }

  return (
    <React.Fragment>
      {!isLoading ? (
        <ul className={`movies-list ${slideType && slideType}`}>
          {popularMovies.map((movie) => {
            return <MovieItem movie={movie} key={movie.id} />;
          })}
        </ul>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default React.memo(MoviesList);
