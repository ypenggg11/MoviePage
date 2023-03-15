import { useCallback, useState } from "react";

/* Custom hook for data fetch (TODO: handle error && loading states) */
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  /* Fetch the data with the fetchURL arg, and send the result to sendDataFunc() */
  const fetchGet = useCallback(
    async (fetchURL, sendDataFunc, signal) => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch(fetchURL, { signal: signal });

        if (!response.ok) {
          throw new Error("Request failed...");
        }

        const data = await response.json();
        sendDataFunc(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(true);
        }
      }
      setIsLoading(false);
    },
    []
  );

  return { fetchGet, isLoading, error };
};

export default useFetch;
