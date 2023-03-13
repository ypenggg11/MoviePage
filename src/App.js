import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";

import MovieDetail from "./components/MovieDetail/MovieDetail";
import Movies from "./components/Movies/Movies";

const App = () => {
  const { pathname } = useLocation(); 

  return (
    <React.Fragment>
      {/* Header */}
      <Header />
      {/* Main page content */}
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
    </React.Fragment>
  );
};

export default App;
