import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import Card from "../../UI/Card";
import NavButton from "../../UI/NavButton";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

import BackButton from "../../assets/Icons/BackButton";
import AuthContext from "../../store/auth-context";
import useFetch from "../../hooks/useFetch";
import { BehaviorSubject } from "rxjs";

const Detail = ({ movie }) => {
  const navigate = useNavigate();
  const rating$ = useMemo(() => new BehaviorSubject(0), []);
  const authContext = useContext(AuthContext);
  const [ratingValue, setRatingValue] = useState(0);
  const { fetchGet } = useFetch();

  const loadRating = useCallback(
    (data) => {
      const currentRating = data.results.filter((ratedMovie) => {
        return ratedMovie.id === movie.id
    }).shift().rating;

      rating$.next(currentRating);
    },
    [movie.id, rating$]
  );

  useEffect(() => {
    let sub;

    if (authContext.isLoggedIn) {
      sub = rating$.subscribe(rate => setRatingValue(rate));
    }

    return () => {
      sub && sub.unsubscribe();
    };
  }, [rating$, authContext.isLoggedIn]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const sessionId = sessionStorage.getItem("sessionId");

    sessionId &&
      fetchGet(
        `https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&session_id=${sessionId}`,
        loadRating,
        signal
      );
  }, [fetchGet, loadRating]);

  const backButtonHandler = () => {
    navigate(-1);
  };

  const changeRating = async (value) => {
    const sessionId = sessionStorage.getItem("sessionId");

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: value,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed...");
      }

      const data = await response.json();
      alert(data.success ? "Rating updated!" : "Rating failed...");
    } catch (error) {
      alert("Rating failed...");
    }
  };

  const changeRatingHandler = (event, value) => {
    rating$.next(value * 2);

    changeRating(value * 2);
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
            defaultValue={ratingValue / 2}
            precision={0.5}
            value={ratingValue / 2}
            onChange={changeRatingHandler}
          />
          <p className='detail-container__text--inline'>{ratingValue}</p>
        </div>
      )}
    </Card>
  );
};

export default Detail;
