import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthContext from "./store/auth-context";
import { ErrorBoundary } from "react-error-boundary";
import PaginationContextProvider from "./store/PaginationContextProvider";

import {
  MovieDetailsContainer,
  MoviesListContainer,
  ProfileModalContainer,
} from "./containers";
import {
  AuthModalComponent,
  ErrorFallbackComponent,
  HeaderComponent,
  HomeComponent,
} from "./components";
import { getFavoriteMoviesUrl } from "./services/api-requests";

const App = () => {
  const { isLoggedIn, sessionId } = useContext(AuthContext);

  let protectedRoutes;

  /* If the user is not logged in, navigate to login, if is logged, to profile */
  if (!isLoggedIn) {
    protectedRoutes = (
      <React.Fragment>
        <Route path='/login' element={<AuthModalComponent />} />
        <Route path='/profile' element={<Navigate to='/login' />} />
        {/* Not logged in, redirect to login */}
        <Route path='/profile/favorites' element={<Navigate to='/login' />} />
      </React.Fragment>
    );
  } else {
    protectedRoutes = (
      <React.Fragment>
        <Route path='/login' element={<Navigate to='/profile' />} />
        <Route path='/profile' element={<ProfileModalContainer />} />
        {/* Display current user favorites movies */}
        <Route
          path='/profile/favorites'
          element={
            <MoviesListContainer fetchUrl={getFavoriteMoviesUrl(sessionId)} />
          }
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ErrorBoundary fallback={<ErrorFallbackComponent />}>
        <PaginationContextProvider>
          {/* Header */}
          <HeaderComponent />
          {/* All page routes */}
          <Routes>
            {/* Home */}
            <Route exact path='/' element={<HomeComponent />} />
            {/* Movie Details */}
            <Route path='/movie/:movieId' element={<MovieDetailsContainer />} />
            {/* Protected routes */}
            {protectedRoutes}
            {/* If entered an invalid path, navigate to '/' route */}
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </PaginationContextProvider>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default App;
