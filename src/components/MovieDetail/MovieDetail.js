import React, { useState, useEffect, useContext, useCallback } from "react";

import styles from "./MovieDetail.module.css";

import useFetch from "../../hooks/useFetch";
import DetailsContext from "../../store/details-context";
import Card from "../../UI/Card/Card";
import NavButton from "../../UI/NavButton/NavButton";

/* Fetch the movie id and show it details on screen */
const MovieDetail = (props) => {
  const detailContext = useContext(DetailsContext);

  const [movie, setMovie] = useState();

  /* Set the movie object to show to the movie state */
  const addMovieToShow = useCallback((data) => {
    setMovie({
      title: data.title,
      release_date: data.release_date,
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

  /* Get the movie object and push each property to an array for map them later */
  let details = [];

  if (movie !== undefined) {
    for (const property in movie) {
      details.push(movie[property]);
    }
  }

  return (
    <Card>
      {details.map((detail, index) => {
        return <p key={index}>{detail}</p>;
      })}
      <NavButton onClick={detailContext.onHideDetailHandler}>Back</NavButton>
    </Card>
  );
};

export default React.memo(MovieDetail);
