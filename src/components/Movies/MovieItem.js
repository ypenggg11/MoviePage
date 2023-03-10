import React from "react";

import Card from "../../UI/Card";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

/* Render each Movie from the MovieList wrapped by a Card component */
const MovieItem = ({ movie }) => {
  return (
    <li className="movie-item">
      <Card>
        {/* Title */}
        <h3 className="movie-item__title">{movie.title}</h3>
        {/* Poster image */}
        <Link to={`/movie/${movie.id}`} className="movie-item__link">
          <LazyLoadImage
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt='Movie poster'
            effect='blur'
            className="movie-item__link--image"
          />
        </Link>
        <div className="movie-item__description-container">
          {/* Release date */}
          <div className="movie-item__description">
            <p className="movie-item__description--left">Release date: </p>
            <p className="movie-item__description--right">{movie.release_date}</p>
          </div>
          {/* Popularity */}
          <div className="movie-item__description">
            <p className="movie-item__description--left">Popularity: </p>
            <p className="movie-item__description--right">{movie.popularity}</p>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default React.memo(MovieItem);
