import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeComponent from "./components/Home/HomeComponent";

import MovieDetailsContainer from "./containers/MovieDetails/MovieDetailsContainer";

const App = () => {
  
  return (
    <Routes>
      {/* React router main paths */}
      <Route exact path='/' element={<HomeComponent />} />
      <Route
        path={`/movie/:movieId`}
        element={<MovieDetailsContainer />}
      />
      {/* If entered an invalid path, navigate to '/' route */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default App;
