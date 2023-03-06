import React, { useContext } from "react";

import styles from "./MovieItem.module.css";

import Card from "../../../../UI/Card/Card";
import DetailsContext from "../../../../store/details-context";

const MovieItem = ({ movie }) => {
  const detailsContext = useContext(DetailsContext);

  return (
    <li className={styles.li}>
      <Card>
        {/* Title */}
        <h3>{movie.title}</h3>
        {/* Poster image */}
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt='Movie poster'
          className={styles.poster}
          onClick={() => {
            detailsContext.onShowDetailHandler(movie.id);
          }}
        />
        {/* Release date */}
        <div className={styles.description}>
          <p>Release date: </p>
          <p>{movie.release_date}</p>
        </div>
        {/* Popularity */}
        <div className={styles.description}>
          <p>Popularity: </p>
          <p>{movie.popularity}</p>
        </div>
      </Card>
    </li>
  );
};

export default MovieItem;
