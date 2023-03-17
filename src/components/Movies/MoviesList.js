import React, { useState, useEffect } from "react";
import { getApiDefaultPath, getApiKey } from "../../services/api-config";

import MovieItem from "./MovieItem";
import useFetch from "../../hooks/useFetch";
import Loader from "../../UI/Loader";

/* Component that renders each movie fetched from the API as a MovieItem */
const MoviesList = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);

  const { data, isLoading } = useFetch(
    `${getApiDefaultPath()}movie/popular?api_key=${getApiKey()}&language=en-US&page=${
      props.page
    }`
  );

  useEffect(() => {
    if (data !== null) {
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
    }
  }, [data]);

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
