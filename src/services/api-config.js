/* Configurations related to the TMDB API */

export const getApiAuthPath = () => {
  return "https://api.themoviedb.org/3/authentication/";
};

export const getApiDefaultPath = () => {
  return "https://api.themoviedb.org/3/";
};

export const getApiKey = () => {
  return process.env.REACT_APP_MOVIES_API_KEY;
};

export const getPostConfig = (method) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const getSearchMovieUrl = (searchQuery) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${getApiKey()}&query=${searchQuery}`;
};

export const getPopularMovies = () => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${getApiKey()}`;
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
    {
      ...getPostConfig("POST"),
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        favorite: isFavourite,
      }),
    },
  ];
};
