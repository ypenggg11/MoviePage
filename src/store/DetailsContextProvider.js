import React, { useState, useCallback } from "react";
import DetailsContext from "./details-context";

/* Provides the DetailsContext as a component */
const DetailsContextProvider = (props) => {
  /* Movie id for display the details */
  const [movieId, setMovieId] = useState();

  /* Manage show/hide details */
  const [isDetailsShowing, setIsDetailsShowing] = useState(false);

  /* Set the movie id to show, and save the current page on local storage */
  const onShowDetailHandler = useCallback((movieId, page) => {
    setIsDetailsShowing(true);
    setMovieId(movieId);
    localStorage.setItem("page", page);
  },[]);

  /* Reset the movie id and hide the details */
  const onHideDetailHandler = useCallback(() => {
    setIsDetailsShowing(false);
    setMovieId(undefined);
  },[]);

  return (
    <DetailsContext.Provider
      value={{
        isDetailsShowing: isDetailsShowing,
        movieIdToShow: movieId,
        onShowDetailHandler: onShowDetailHandler,
        onHideDetailHandler: onHideDetailHandler,
      }}
    >
      {props.children}
    </DetailsContext.Provider>
  );
};

export default React.memo(DetailsContextProvider);
