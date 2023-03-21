import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthModal from "./components/AuthModal/AuthModal";
import Profile from "./components/AuthModal/Profile";
import Header from "./components/Header/Header";

import MovieDetail from "./components/MovieDetail/MovieDetail";
import Movies from "./components/Movies/Movies";
import AuthContext from "./store/auth-context";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/Error/ErrorFallback";
import PaginationContextProvider from "./store/PaginationContextProvider";

const App = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const pathname = location.pathname;

  let protectedRoutes;

  /* If the user is not logged in, navigate to login, if is logged, to profile */
  if (!authContext.isLoggedIn) {
    protectedRoutes = (
      <React.Fragment>
        <Route path='/login' element={<AuthModal />} />
        <Route
          path='/profile'
          element={<Navigate to='/login' />}
        />
      </React.Fragment>
    );
  } else {
    protectedRoutes = (
      <React.Fragment>
        <Route path='/login' element={<Navigate to='/profile' />} />
        <Route
          path='/profile'
          element={<Profile />}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <PaginationContextProvider>
          {/* Header */}
          <Header />
          {/* Main page content */}
          <Routes>
            {/* Movies List */}
            <Route exact path='/' element={<Movies />} />
            {/* Movie Detail */}
            <Route
              path='/movie/*'
              element={<MovieDetail movieId={pathname.split("/")[2]} />}
            />
            {/* Protected routes */}
            {protectedRoutes}
            {/* If entered an invalid path, navigate to '/home' route */}
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </PaginationContextProvider>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default App;
