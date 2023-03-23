import React from "react";

import CardWrapperComponent from "../UI/CardWrapperComponent"
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImage } from "../../services/api-requests";

/* Render each Movie from the MovieList wrapped by a Card component */
const MovieCardComponent = ({ movie }) => {
  return (
    <li className='movie-item' aria-label="movie-item">
      <CardWrapperComponent>
        {/* Title */}
        <h3 className='movie-item__title'>{movie.title}</h3>
        {/* Poster image */}
        <Link to={`/movie/${movie.id}`} className='movie-item__link'>
            <LazyLoadImage
              src={getImage(movie.poster_path)}
              alt='Movie poster'
              effect='blur'
              className='movie-item__link--image'
            />
        </Link>
        {/* Bottom description container */}
        <div className='movie-item__description-container'>
          {/* Release date */}
          <div className='movie-item__description'>
            <p className='movie-item__description--left'>Release date: </p>
            <p className='movie-item__description--right'>
              {movie.release_date}
            </p>
          </div>
          {/* Popularity */}
          <div className='movie-item__description'>
            <p className='movie-item__description--left'>Popularity: </p>
            <p className='movie-item__description--right'>{movie.popularity}</p>
          </div>
        </div>
      </CardWrapperComponent>
    </li>
  );
};

export default React.memo(MovieCardComponent);
