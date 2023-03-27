import React from "react";

import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImageUrl } from "../../services/api-requests";

import { CardWrapperComponent } from "../../components";

/* Render the Movie passed as props wrapped by a Card component */
export const MovieCardComponent = React.memo(({ movie }) => {

  const addFallbackImage = (ev) => {
  ev.target.src =
    "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";
  };

  return (
    <li className='movie-item' aria-label='movie-item'>
      <CardWrapperComponent>
        {/* Title */}
        <h3 className='movie-item__title'>{movie.title}</h3>
        {/* Poster image */}
        <Link to={`/movie/${movie.id}`} className='movie-item__link'>
          <LazyLoadImage
            src={getImageUrl(movie.poster_path)}
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
      </CardWrapperComponent>
    </li>
  );
});
