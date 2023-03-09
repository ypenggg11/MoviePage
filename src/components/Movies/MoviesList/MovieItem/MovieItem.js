import React from "react";

import styles from "./MovieItem.module.css";

import Card from "../../../../UI/Card/Card";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

/* Render each Movie from the MovieList wrapped by a Card component */
const MovieItem = ({ movie }) => {
  return (
    <li className={styles.li}>
      <Card>
        {/* Title */}
        <h3 className={styles.title}>{movie.title}</h3>
        {/* Poster image */}
        <Link to={`/movie/${movie.id}`}>
          <LazyLoadImage
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt='Movie poster'
            effect='blur'
          />
        </Link>
        <div className={styles["description-container"]}>
            {/* Release date */}
            <div className={styles.description}>
              <p className={styles.left}>Release date: </p>
              <p className={styles.right}>{movie.release_date}</p>
            </div>
            {/* Popularity */}
            <div className={styles.description}>
              <p className={styles.left}>Popularity: </p>
              <p className={styles.right}>{movie.popularity}</p>
            </div>
          </div>
      </Card>
    </li>
  );
};

export default React.memo(MovieItem);
