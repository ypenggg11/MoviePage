import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import BackIcon from "../../assets/Icons/BackIcon";
import AuthContext from "../../store/auth-context";
import FavouriteMark from "./FavouriteMark";

import { MovieRatingContainer } from "../../containers";
import {
  CardWrapperComponent,
  NavigationButtonComponent,
} from "../../components";

/* Renders the movie details */
export const DetailsCardComponent = ({ movie }) => {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <CardWrapperComponent className='detail-container'>
      <div className='detail-container__top'>
        {/* Title */}
        <h1 className='detail-container__title'>
          {movie.title}
          {authContext.isLoggedIn && <FavouriteMark movie={movie}/>}
        </h1>
        {/* Back button */}
        <NavigationButtonComponent onClick={backButtonHandler}>
          <BackIcon />
        </NavigationButtonComponent>
      </div>
      <hr />
      {/* Genres */}
      <h3 className='detail-container__section'>Genres</h3>
      <p className='detail-container__text'>
        {movie.genres.map((genre) => {
          return (
            <span key={genre.id} className='detail-container__text--h-spacer'>
              {genre.name}
            </span>
          );
        })}
      </p>
      {/* Overview */}
      <h3 className='detail-container__section'>Overview</h3>
      <p className='detail-container__text'>{movie.overview}</p>
      {/* Rating */}
      <div>
        <h3 className='detail-container__section detail-container__section--inline'>
          Rating
        </h3>
        <p className='detail-container__text detail-container__section--inline'>
          {movie.vote_average + "/ 10"}
        </p>
      </div>
      {/* User rating */}
      {authContext.isLoggedIn && <MovieRatingContainer movie={movie} />}
    </CardWrapperComponent>
  );
};
