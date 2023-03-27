import { useCallback, useState } from "react";

/* Custom hook for data fetch (TODO: handle error && loading states) */
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /* Fetch the data with the fetchURL arg, and send the result to sendDataFunc() */
  const fetchData = useCallback(
    async (fetchURL, sendDataFunc, options) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(fetchURL, { ...options });

        if (!response.ok) {
          throw new Error("Request failed...");
        }

        const data = await response.json();
        sendDataFunc(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
      setIsLoading(false);
    },
    []
  );

  return { fetchData, isLoading, error };
};

export default useFetch;
