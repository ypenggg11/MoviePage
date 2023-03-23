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

export const getPopularMovies = (page) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${getApiKey()}&page=${page}`;
};

export const getMovieDetails = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${getApiKey()}`;
};

export const getRating = (sessionId, page) => {
  return `https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=${getApiKey()}&session_id=${sessionId}&page=${page}`;
};

export const postRating = (movieId, sessionId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${getApiKey()}&session_id=${sessionId}`;
};

export const getAccountDetail = (sessionId) => {
  return `https://api.themoviedb.org/3/account?api_key=${getApiKey()}&session_id=${sessionId}`;
};
