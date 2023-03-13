import React, { useContext, useState } from "react";
import Card from "../../UI/Card";
import NavButton from "../../UI/NavButton";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

import BackButton from "../../assets/Icons/BackButton";
import AuthContext from "../../store/auth-context";

const Detail = ({ movie }) => {
  const navigate = useNavigate();
  const initialRating = 2.5;
  const authContext = useContext(AuthContext);
  const [ratingValue, setRatingValue] = useState(initialRating);

  const backButtonHandler = () => {
    navigate(-1);
  };

  const changeRatingHandler = (event, value) => {
    setRatingValue(value);
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
        <h3 className='detail-container__section--inline'>Rating</h3>
        <p className='detail-container__text--inline'>
          {movie.vote_average + "/ 10"}
        </p>
      </div>
      {/* User rating */}
      {authContext.isLoggedIn && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Rating
            name='movie-rating'
            defaultValue={initialRating}
            precision={0.5}
            value={ratingValue}
            onChange={changeRatingHandler}
          />
          <p className='detail-container__text--inline'>{ratingValue * 2}</p>
        </div>
      )}
    </Card>
  );
};

export default Detail;
