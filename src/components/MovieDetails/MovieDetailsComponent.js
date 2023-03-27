import React from "react";

import { DetailsCardComponent, MoviePosterComponent } from "../../components";

/* Renders a background image, the movie poster and it details */
export const MovieDetailsComponent = React.memo(({ movie }) => {
  return (
    // Background image
    <div
      className='movie-detail__background'
      style={{
        backgroundImage: `linear-gradient(
              to bottom,
              rgb(0 0 0 / 0.9),
              rgb(0 0 0 / 0.6)
            ), url(${movie.backdrop_path})`,
      }}
    >
      <div className='movie-detail__container'>
        {/* Movie poster display */}
        <MoviePosterComponent
          image={movie.poster_path}
          alt={movie.title}
          homepage={movie.homepage}
        />
        {/* Details card */}
        <DetailsCardComponent movie={movie} />
      </div>
    </div>
  );
});
