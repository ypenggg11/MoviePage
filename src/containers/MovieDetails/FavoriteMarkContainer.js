import React, { useContext, useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import {
  addPageParam,
  getFavoriteMoviesUrl,
  postMovieAsFavoriteUrl,
} from "../../services/api-requests";
import AuthContext from "../../store/auth-context";
import { FavoriteMarkComponent } from "../../components";

/* Fetch and handles the current movie favorite states */
export const FavoriteMarkContainer = ({ movie }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [favoritePage, setFavoritePage] = useState(1);
  const authContext = useContext(AuthContext);
  const [fetchUrl, setFetchUrl] = useState({});

  /* Get if the current movie it's marked as favorite */
  const { data } = useFetch(
    addPageParam(getFavoriteMoviesUrl(authContext.sessionId), favoritePage)
  );

  /* Post a new favorite state (marked or unmarked) */
  useFetch(fetchUrl.request, fetchUrl.options);

  /* Recovers the data once it's a valid value */
  useEffect(() => {
    if (data !== null) {
      const currentFavourite = data.results.find(
        (favouriteMovie) => favouriteMovie.id === movie.id
      );

      /* If the favorite of that movie exists, update the state value,
          else increment the page state and try again fetching with the next page */
      currentFavourite
        ? setIsChecked(true)
        : favoritePage < data.total_pages &&
          setFavoritePage((prevValue) => {
            return +prevValue + 1;
          });
    }
  }, [data, movie.id, favoritePage]);

  /* Post the new marked as favorite value */
  const changeHandler = () => {
    setIsChecked((prevState) => {
      const newState = !prevState;
      const [requestUrl, options] = postMovieAsFavoriteUrl(
        authContext.sessionId,
        movie.id,
        newState
      );

      setFetchUrl({ request: requestUrl, options: options });

      return newState;
    });
  };

  return (
    <FavoriteMarkComponent onChange={changeHandler} isChecked={isChecked} />
  );
};
