import React, { useState } from "react";
import DetailsContext from "./details-context";

const DetailsContextProvider = (props) => {
  const [movieId, setMovieId] = useState();
  const [isDetailsShowing, setIsDetailsShowing] = useState(false);

  const onShowDetailHandler = (movieId) => {
    setIsDetailsShowing(true);
    setMovieId(movieId);
  };

  const onHideDetailHandler = () => {
    setIsDetailsShowing(false);
    setMovieId(undefined);
  };

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

export default DetailsContextProvider;
