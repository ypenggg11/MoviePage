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
import { getConfig, getRating, postRating } from "../../services/api-requests";
import { MovieRatingComponent } from "../../components";

// Rating can be a normal state, and we can fetch data with observables,
// and use a Subject with the movie id, pipe it, and fetch with fromFetch after.
const MovieRatingContainer = ({ movie }) => {
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
    getRating(sessionStorage.getItem("sessionId"), ratingPage)
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
  const changeRating = useCallback(
    async (value) => {
      setRatingUpdateStatus({ show: false, text: "" });
      const sessionId = sessionStorage.getItem("sessionId");

      try {
        const response = await fetch(
          postRating(movie.id, sessionId),
          getConfig("POST", { value: value })
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
      <MovieRatingComponent
        value={ratingValue}
        status={ratingUpdateStatus}
        onChange={changeRatingHandler}
      />
    </div>
  );
};

export default React.memo(MovieRatingContainer);
