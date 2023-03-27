import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import AuthContext from "../../store/auth-context";
import useFetch from "../../hooks/useFetch";
import { BehaviorSubject } from "rxjs";
import {
  getOptions,
  getRatingUrl,
  postRatingUrl,
} from "../../services/api-requests";
import { MovieRatingComponent } from "../../components";

/* Fetchs the current user movie rating and handles all onChange events, posting the new value to the API */
export const MovieRatingContainer = React.memo(({ movie }) => {
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
    getRatingUrl(sessionStorage.getItem("sessionId"), ratingPage)
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
      const currentRating = data.results.find(
        (ratedMovie) => ratedMovie.id === movie.id
      );

      /* If the rating of that movie exists, update the observable value,
           else increment the ratingPage state and try again fetching with the next page */
      currentRating
        ? rating$.next(currentRating.rating)
        : ratingPage < data.total_pages &&
          setRatingPage((prevValue) => {
            return +prevValue + 1;
          });
    }
  }, [data, movie.id, rating$, ratingPage]);

  /* POST the new rating value to the API and update the 
     ratingUpdateStatus state depending on the POST response */
  const changeRating = useCallback(
    async (value) => {
      setRatingUpdateStatus({ show: false, text: "" });
      const sessionId = sessionStorage.getItem("sessionId");

      try {
        const response = await fetch(
          postRatingUrl(movie.id, sessionId),
          getOptions("POST", { value: value })
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
    },
    [movie.id]
  );

  const changeRatingHandler = useCallback(
    (value) => {
      rating$.next(value * 2);
      changeRating(value * 2);
    },
    [changeRating, rating$]
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
      title='rating-container'
    >
      {/* Display the fetched rating on the rating component */}
      <MovieRatingComponent
        rateValue={ratingValue}
        status={ratingUpdateStatus}
        onChange={changeRatingHandler}
      />
    </div>
  );
});
