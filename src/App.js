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
  const background = location.state && location.state.background;
  const pathname = location.pathname;

  let protectedRoutes;

  if (!authContext.isLoggedIn) {
    protectedRoutes = (
      <React.Fragment>
        <Route path='/login' element={<AuthModal />} />
        <Route path='/profile' element={<Navigate to='/login' />} />
      </React.Fragment>
    );
  } else {
    protectedRoutes = (
      <React.Fragment>
        <Route path='/login' element={<Navigate to='/profile' />} />
        <Route path='/profile' element={<Profile />} />
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
          <Routes location={background || location}>
            {/* React router main paths */}
            <Route exact path='/' element={<Movies />} />
            <Route
              path='/movie/*'
              element={<MovieDetail movieId={pathname.split("/")[2]} />}
            />
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
