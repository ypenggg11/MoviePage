import React, { useState, useEffect, useContext, useCallback } from "react";

import styles from "./MovieDetail.module.css";

import useFetch from "../../hooks/useFetch";
import DetailsContext from "../../store/details-context";
import Card from "../../UI/Card/Card";
import NavButton from "../../UI/NavButton/NavButton";

const MovieDetail = (props) => {
  const detailContext = useContext(DetailsContext);

  const [movie, setMovie] = useState();

  const addMovieToShow = useCallback((data) => {
    setMovie({
      title: data.title,
      release_date: data.release_date,
    });
  }, []);

  const { fetchMovie } = useFetch();

  useEffect(() => {
    fetchMovie(
      `https://api.themoviedb.org/3/movie/${props.movieId}?api_key=d301e50e3f3e231cf44323999a3b87d7&`,
      addMovieToShow
    );
  }, [fetchMovie, addMovieToShow, props.movieId]);

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
