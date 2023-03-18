import React, { useContext } from "react";
import Card from "../../UI/Card";
import NavButton from "../../UI/NavButton";
import { useNavigate } from "react-router-dom";

import BackButton from "../../assets/Icons/BackButton";
import MovieRating from "./MovieRating";
import AuthContext from "../../store/auth-context";

const Detail = ({ movie }) => {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <Card className='detail-container'>
      <div className='detail-container__top'>
        {/* Title */}
        <h1 className='detail-container__title'>{movie.title}</h1>
        {/* Back button */}
        <NavButton onClick={backButtonHandler}>
          <BackButton />
        </NavButton>
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
        <h3 className='detail-container__section detail-container__section--inline'>Rating</h3>
        <p className='detail-container__text detail-container__section--inline'>
          {movie.vote_average + "/ 10"}
        </p>
      </div>
      {/* User rating */}
      {authContext.isLoggedIn && <MovieRating movie={movie}/>}
    </Card>
  );
};

export default Detail;
