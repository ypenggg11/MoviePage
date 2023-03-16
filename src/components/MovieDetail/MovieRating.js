import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import AuthContext from "../../store/auth-context";
import useFetch from "../../hooks/useFetch";
import { BehaviorSubject } from "rxjs";
import { Rating } from "@mui/material";
import { getApiDefaultPath } from "../../services/api-config";

const MovieRating = ({movie}) => {
  const rating$ = useMemo(() => new BehaviorSubject(0), []);
  const authContext = useContext(AuthContext);
  const [ratingUpdateStatus, setRatingUpdateStatus] = useState({
    show: false,
    text: "",
  });
  const [ratingValue, setRatingValue] = useState(0);
  const { fetchTMDB } = useFetch();

  const loadRating = useCallback(
    (data) => {
      const currentRating = data.results
        .filter((ratedMovie) => {
          return ratedMovie.id === movie.id;
        })
        .shift().rating;

      rating$.next(currentRating);
    },
    [movie.id, rating$]
  );

  useEffect(() => {
    let sub;

    if (authContext.isLoggedIn) {
      sub = rating$.subscribe((rate) => setRatingValue(rate));
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
    fetchTMDB(
        `${getApiDefaultPath()}account/{account_id}/rated/movies?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&session_id=${sessionId}`,
        loadRating,
        signal
      );
  }, [fetchTMDB, loadRating]);

  const changeRating = async (value) => {
    setRatingUpdateStatus({ show: false, text: "" });
    const sessionId = sessionStorage.getItem("sessionId");

    try {
      const response = await fetch(
        `${getApiDefaultPath()}movie/${movie.id}/rating?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&session_id=${sessionId}`,
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

      data.success
        ? setRatingUpdateStatus({ show: true, text: "Updated!" })
        : setRatingUpdateStatus({ show: true, text: "An error occurred..." });
    } catch (error) {
      setRatingUpdateStatus({ show: true, text: "An error occurred..." });
    }
  };

  const changeRatingHandler = (event, value) => {
    rating$.next(value * 2);

    changeRating(value * 2);
  };

  return (
    <React.Fragment>
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
          {ratingUpdateStatus.show && (
            <p
              className={`detail-container__text--inline ${
                ratingValue && "pop-in"
              }`}
            >
              {ratingUpdateStatus.text}
            </p>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default MovieRating;
