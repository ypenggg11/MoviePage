import { useState, useCallback } from "react";

/* Custom hook for data fetch (TODO: handle error && loading states) */
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /* Fetch the data with the fetchURL arg, and send the result to sendDataFunc() */

  const fetchTMDB = useCallback(
    async (fetchURL, dataDestination, options = {}) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(fetchURL, { ...options });

        if (!response.ok) {
          throw new Error("Request failed...");
        }

        const data = await response.json();

        dataDestination(data);

        setIsLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
    },
    []
  );

  return { fetchTMDB, isLoading, error };
};

export default useFetch;
