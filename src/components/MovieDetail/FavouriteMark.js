import React, { useContext, useEffect, useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import useFetch from "../../hooks/useFetch";
import {
  addPageParam,
  getFavouriteMovies,
  postMarkMovieFavourite,
} from "../../services/api-config";
import AuthContext from "../../store/auth-context";

const FavouriteMark = ({ movie }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [favouritePage, setFavouritePage] = useState(1);
  const authContext = useContext(AuthContext);
  const [fetchUrl, setFetchUrl] = useState({});

  const { data } = useFetch(
    addPageParam(getFavouriteMovies(authContext.sessionId), favouritePage)
  );

  useFetch(fetchUrl.request, fetchUrl.options);

  useEffect(() => {
    if (data !== null) {
      const currentFavourite = data.results
        .filter((favouriteMovie) => {
          return favouriteMovie.id === movie.id;
        })
        .shift();

      currentFavourite
        ? setIsChecked(true)
        : setFavouritePage((prevValue) => {
            return +prevValue + 1;
          });
    }
  }, [data, movie.id]);

  const changeHandler = () => {
    setIsChecked((prevState) => {
      const newState = !prevState;
      const [requestUrl, options] = postMarkMovieFavourite(
        authContext.sessionId,
        movie.id,
        newState
      );

      setFetchUrl({ request: requestUrl, options: options });

      return newState;
    });
  };

  return (
    <Checkbox
      inputProps={{ "aria-label": "Favourite Checkbox" }}
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite sx={{ color: "rgb(255, 49, 49)" }} />}
      sx={{ marginLeft: "0.3em" }}
      onChange={changeHandler}
      checked={isChecked}
    />
  );
};

export default FavouriteMark;
