import React, { useState, useEffect, useContext } from "react";

import useFetch from "../../hooks/useFetch";
import PaginationContext from "../../store/pagination-context";
import { getPopularMoviesUrl } from "../../services/api-requests";

import { LoaderComponent, PopularMoviesComponent } from "../../components";

/* Fetch all popular movies from a specific page and renders a component that renders them */
const PopularMoviesContainer = () => {
  const { page } = useContext(PaginationContext);

  const [popularMovies, setPopularMovies] = useState([]);

  /* Custom hook for data fetching */
  const { data, isLoading } = useFetch(getPopularMoviesUrl(page));

  /* Once the data was fetched successfully, update the popular movies state */
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

  return (
    <React.Fragment>
      {!isLoading ? (
        <PopularMoviesComponent movies={popularMovies} />
      ) : (
        <LoaderComponent />
      )}
    </React.Fragment>
  );
};

export default React.memo(PopularMoviesContainer);
