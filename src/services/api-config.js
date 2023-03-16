export const getApiAuthPath = () => {
  return "https://api.themoviedb.org/3/authentication/";
};

export const getApiDefaultPath = () => {
    return "https://api.themoviedb.org/3/";
  };

export const getPostConfig = (method) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
};
