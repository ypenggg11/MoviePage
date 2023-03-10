import React from "react";
import Card from "../../UI/Card";
import NavButton from "../../UI/NavButton"
import { useNavigate } from "react-router-dom";

import BackButton from "../../assets/Icons/BackButton";

const Detail = ({ movie }) => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <Card className="detail-container">
      <div className="detail-container__top">
        {/* Title */}
        <h1 className="detail-container__title">{movie.title}</h1>
        {/* Back button */}
        <NavButton onClick={backButtonHandler}>
          <BackButton />
        </NavButton>
      </div>
      <hr />
      {/* Genres */}
      <h3 className="detail-container__section">Genres</h3>
      <p className="detail-container__text">
        {movie.genres.map((genre) => {
          return <span key={genre.id} className="detail-container__text--h-spacer">{genre.name}</span>;
        })}
      </p>
      {/* Overview */}
      <h3 className="detail-container__section">Overview</h3>
      <p className="detail-container__text">{movie.overview}</p>
      {/* Rating */}
      <h3 className="detail-container__section">Rating</h3>
      <p className="detail-container__text">{movie.vote_average + "/ 10"}</p>
    </Card>
  );
};

export default Detail;
