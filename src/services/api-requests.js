/* Requests related to the TMDB API */

export const getApiAuthPath = () => {
  return "https://api.themoviedb.org/3/authentication/";
};

export const getApiKey = () => {
  return process.env.REACT_APP_MOVIES_API_KEY;
};

export const getImage = (path) => {
  return `https://image.tmdb.org/t/p/original/${path}`;
};

export const getConfig = (method, body) => {
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

export const getPopularMovies = () => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${getApiKey()}`;
};

export const getMovieDetails = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${getApiKey()}`;
};

export const getRating = (sessionId) => {
  return `https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=${getApiKey()}&session_id=${sessionId}`;
};

export const postRating = (movieId, sessionId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${getApiKey()}&session_id=${sessionId}`;
};

export const getAccountDetail = (sessionId) => {
  return `https://api.themoviedb.org/3/account?api_key=${getApiKey()}&session_id=${sessionId}`;
};

// Steps to login: request_token -> login_token -> session_id

export const getRequestToken = () => {
  return `https://api.themoviedb.org/3/authentication/token/new?api_key=${getApiKey()}`;
};

export const getLoginToken = () => {
  return `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${getApiKey()}`;
};

export const getSessionId = () => {
  return `https://api.themoviedb.org/3/authentication/session/new?api_key=${getApiKey()}`;
};

export const deleteSession = () => {
  return `https://api.themoviedb.org/3/authentication/session?api_key=${getApiKey()}`;
};

export const getSearchMovieUrl = (searchQuery) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${getApiKey()}&query=${searchQuery}`;
};

export const getFavouriteMovies = (sessionId) => {
  return `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${getApiKey()}&session_id=${sessionId}`;
};

export const addPageParam = (requestUrl, page) => {
  return `${requestUrl}&page=${page}`;
};

export const postMarkMovieFavourite = (sessionId, movieId, isFavourite) => {
  return [
    `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${getApiKey()}&session_id=${sessionId}`,
    getConfig("POST", {
      media_type: "movie",
      media_id: movieId,
      favorite: isFavourite,
    }),
  ];
};
