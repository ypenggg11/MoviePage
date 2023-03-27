/* Requests related to the TMDB API */

export const getApiKey = () => {
  return process.env.REACT_APP_MOVIES_API_KEY;
};

export const getImageUrl = (path) => {
  return `https://image.tmdb.org/t/p/original/${path}`;
};

export const getPostConfig = (method, body) => {
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
