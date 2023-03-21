import React, { useState, useEffect } from "react";

import useFetch from "../../hooks/useFetch";
import Detail from "./Detail";
import ImageDisplay from "./ImageDisplay";
import Loader from "../../UI/Loader";
import { getApiDefaultPath, getApiKey } from "../../services/api-config";

/* Fetch the movie id and show it details on screen */
const MovieDetail = ({ movieId }) => {
  const [movie, setMovie] = useState();

  /* Fetch the movie based on the movie id */
  const { data, isLoading } = useFetch(
    `${getApiDefaultPath()}movie/${movieId}?api_key=${getApiKey()}`
  );

  /* Update the movie state when data it's available */
  useEffect(() => {
    if (data !== null) {
      setMovie({
        id: data.id,
        title: data.title,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
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
          <div
            className='movie-detail__background'
            style={{
              backgroundImage: `linear-gradient(
              to bottom,
              rgb(0 0 0 / 0.9),
              rgb(0 0 0 / 0.6)
            ), url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            }}
          >
            <div className='movie-detail__container'>
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
