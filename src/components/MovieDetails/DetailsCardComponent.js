import React from "react";
import CardWrapperComponent from "../UI/CardWrapperComponent";
import NavigationButtonComponent from "../UI/NavigationButtonComponent";
import { useNavigate } from "react-router-dom";

import BackIcon from "../../assets/Icons/BackIcon";

const DetailsCardComponent = ({ movie }) => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <CardWrapperComponent className="detail-container">
      <div className="detail-container__top">
        {/* Title */}
        <h1 className="detail-container__title">{movie.title}</h1>
        {/* Back button */}
        <NavigationButtonComponent onClick={backButtonHandler}>
          <BackIcon />
        </NavigationButtonComponent>
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
    </CardWrapperComponent>
  );
};

export default DetailsCardComponent;
