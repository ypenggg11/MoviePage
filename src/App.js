import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import MovieDetail from "./components/MovieDetail/MovieDetail";
import Movies from "./components/Movies/Movies";

import DetailsContext from "./store/details-context";

const App = () => {
  const detailsContext = useContext(DetailsContext);
  const navigate = useNavigate();

  /* On mount, check if the details it's showing and navigate to detail path */
  useEffect(() => {
    if (detailsContext.isDetailsShowing) {
      navigate(`/movie/${detailsContext.movieIdToShow}`);
    }

    return () => {};
  }, [detailsContext.isDetailsShowing, detailsContext.movieIdToShow, navigate]);

  return (
    <Routes>
      {/* React router main paths */}
      <Route exact path='/home' element={<Movies />} />
      <Route
        path={`/movie/${detailsContext.movieIdToShow}`}
        element={<MovieDetail movieId={detailsContext.movieIdToShow} />}
      />
      {/* If entered an invalid path, navigate to '/home' route */}
      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};

export default App;
