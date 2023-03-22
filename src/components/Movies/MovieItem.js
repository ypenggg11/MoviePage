import React from "react";

import Card from "../../UI/Card";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

/* Render each Movie from the MovieList wrapped by a Card component */
const MovieItem = ({ movie }) => {
  const addFallbackImage = (ev) => {
    ev.target.src =
      "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";
  };

  return (
    <li className='movie-item' aria-label='movie-item'>
      <Card>
        {/* Title */}
        <h3 className='movie-item__title'>{movie.title}</h3>
        {/* Poster image */}
        <Link to={`/movie/${movie.id}`} className='movie-item__link'>
          <LazyLoadImage
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt='Movie poster'
            effect='blur'
            className='movie-item__link--image'
            onError={addFallbackImage}
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
      </Card>
    </li>
  );
};

export default React.memo(MovieItem);
