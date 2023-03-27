import React, { useContext, useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import {
  addPageParam,
  getFavoriteMoviesUrl,
  postMovieAsFavoriteUrl,
} from "../../services/api-requests";
import AuthContext from "../../store/auth-context";
import FavouriteMarkComponent from "../../components/MovieDetails/FavoriteMarkComponent";

export const FavouriteMarkContainer = ({ movie }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [favouritePage, setFavouritePage] = useState(1);
  const authContext = useContext(AuthContext);
  const [fetchUrl, setFetchUrl] = useState({});

  const { data } = useFetch(
    addPageParam(getFavoriteMoviesUrl(authContext.sessionId), favouritePage)
  );

  useFetch(fetchUrl.request, fetchUrl.options);

  useEffect(() => {
    if (data !== null) {
      const currentFavourite = data.results.find(
        (favouriteMovie) => favouriteMovie.id === movie.id
      );

      currentFavourite
        ? setIsChecked(true)
        : favouritePage < data.total_pages &&
          setFavouritePage((prevValue) => {
            return +prevValue + 1;
          });
    }
  }, [data, movie.id, favouritePage]);

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
    <FavouriteMarkComponent onChange={changeHandler} isChecked={isChecked} />
  );
};