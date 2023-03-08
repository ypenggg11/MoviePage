import React from "react";

import styles from "./Detail.module.css";

const Detail = ({ movie }) => {
  return (
    <div className={styles.detail}>
      <h1>{movie.title}</h1>
      <p>
        {movie.genres.map((genre) => {
          return <span key={genre.id}>{genre.name+"  "}</span>;
        })}
      </p>
      <p>{movie.overview}</p>
      <p>{movie.popularity}</p>
    </div>
  );
};

export default Detail;
