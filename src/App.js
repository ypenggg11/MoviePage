import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import MovieDetail from "./components/MovieDetail/MovieDetail";
import Movies from "./components/Movies/Movies";

const App = () => {
  const { pathname } = useLocation();
  
  return (
    <Routes>
      {/* React router main paths */}
      <Route exact path='/home' element={<Movies />} />
      <Route
        path={`/movie/*`}
        element={<MovieDetail movieId={pathname.split("/")[2]} />}
      />
      {/* If entered an invalid path, navigate to '/home' route */}
      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};

export default App;
