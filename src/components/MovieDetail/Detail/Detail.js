import React from "react";
import Card from "../../../UI/Card/Card";
import NavButton from "../../../UI/NavButton/NavButton"
import { useNavigate } from "react-router-dom";

import styles from "./Detail.module.css";
import BackButton from "../../../assets/Icons/BackButton";

const Detail = ({ movie }) => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <Card className={styles.detail}>
      <div className={styles["top-container"]}>
        {/* Title */}
        <h1>{movie.title}</h1>
        {/* Back button */}
        <NavButton onClick={backButtonHandler}>
          <BackButton />
        </NavButton>
      </div>
      <hr />
      {/* Genres */}
      <h3>Genres</h3>
      <p>
        {movie.genres.map((genre) => {
          return <span key={genre.id}>{genre.name}</span>;
        })}
      </p>
      {/* Overview */}
      <h3>Overview</h3>
      <p>{movie.overview}</p>
      {/* Rating */}
      <h3>Rating</h3>
      <p>{movie.vote_average + "/ 10"}</p>
    </Card>
  );
};

export default Detail;
