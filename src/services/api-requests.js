/* Requests related to the TMDB API */

export const getApiKey = () => {
  return process.env.REACT_APP_MOVIES_API_KEY;
};

export const getImageUrl = (path) => {
  return `https://image.tmdb.org/t/p/original/${path}`;
};

export const getOptions = (method, body) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
    }),
  };
};

export const getPopularMoviesUrl = (page) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${getApiKey()}&page=${page}`;
};

export const getMovieDetailsUrl = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${getApiKey()}`;
};

export const getRatingUrl = (sessionId, page) => {
  return `https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=${getApiKey()}&session_id=${sessionId}&page=${page}`;
};

export const postRatingUrl = (movieId, sessionId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${getApiKey()}&session_id=${sessionId}`;
};

export const getAccountDetailUrl = (sessionId) => {
  return `https://api.themoviedb.org/3/account?api_key=${getApiKey()}&session_id=${sessionId}`;
};

// Steps to login: request_token -> login_token -> session_id

export const getRequestTokenUrl = () => {
  return `https://api.themoviedb.org/3/authentication/token/new?api_key=${getApiKey()}`; 
};

export const getLoginTokenUrl = () => {
  return `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${getApiKey()}`; 
};

export const getSessionIdUrl = () => {
  return `https://api.themoviedb.org/3/authentication/session/new?api_key=${getApiKey()}`; 
};

export const deleteSessionUrl = () => {
  return `https://api.themoviedb.org/3/authentication/session?api_key=${getApiKey()}`; 
};