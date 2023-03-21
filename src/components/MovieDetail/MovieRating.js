import React, { useContext, useEffect, useState, useMemo } from "react";

import AuthContext from "../../store/auth-context";
import useFetch from "../../hooks/useFetch";
import { BehaviorSubject } from "rxjs";
import { Rating } from "@mui/material";
import { getApiDefaultPath, getApiKey } from "../../services/api-config";

// Rating can be a normal state, and we can fetch data with observables,
// and use a Subject with the movie id, pipe it, and fetch with fromFetch after.


const MovieRating = ({ movie }) => {
  const authContext = useContext(AuthContext);

  /* rating behavior subject observable (on subscribe, have access to the last value) */
  const rating$ = useMemo(() => new BehaviorSubject(0), []);

  /* Rating related states */
  const [ratingPage, setRatingPage] = useState(1);
  const [ratingUpdateStatus, setRatingUpdateStatus] = useState({
    show: false,
    text: "",
  });
  const [ratingValue, setRatingValue] = useState(0);

  /* Fetch all ratings from the current logged user (starting with the first page)*/
  const { data } = useFetch(
    `${getApiDefaultPath()}account/{account_id}/rated/movies?api_key=${getApiKey()}&language=en-US&session_id=${sessionStorage.getItem(
      "sessionId"
    )}&page=${ratingPage}`
  );

  /* Subscribe to the rating observable and when the value changes with .next(),
     update the ratingValue state, and unsubscribe() on unmount (clean up) */
  useEffect(() => {
    let sub;

    if (authContext.isLoggedIn) {
      sub = rating$.subscribe((rate) => setRatingValue(rate));
    }

    return () => {
      sub && sub.unsubscribe();
    };
  }, [rating$, authContext.isLoggedIn]);

  /* Recovers the movie rating based on the current movie id showing on screen */
  useEffect(() => {
    if (data !== null) {
      const currentRating = data.results
        .filter((ratedMovie) => {
          return ratedMovie.id === movie.id;
        })
        .shift();

        /* If the rating of that movie exists, update the observable value,
           else increment the ratingPage state and try again fetching with the next page */
      currentRating
        ? rating$.next(currentRating.rating)
        : setRatingPage((prevValue) => {
            return +prevValue + 1;
          });
    }
  }, [data, movie.id, rating$]);

  /* POST the new rating value to the API and update the 
     ratingUpdateStatus state depending on the POST response */
  const changeRating = async (value) => {
    setRatingUpdateStatus({ show: false, text: "" });
    const sessionId = sessionStorage.getItem("sessionId");

    try {
      const response = await fetch(
        `${getApiDefaultPath()}movie/${
          movie.id
        }/rating?api_key=${getApiKey()}&session_id=${sessionId}`,
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
        title='rating-container'
      >
        <Rating
          name='movie-rating'
          defaultValue={ratingValue / 2}
          precision={0.5}
          value={ratingValue / 2}
          onChange={changeRatingHandler}
          title='movie-rating'
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
    </React.Fragment>
  );
};

export default MovieRating;
