import { useState, useCallback, useEffect } from "react";

/* Custom hook for data fetching, returns the data, loading state, and error state */
const useFetch = (endpointPath, options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /* Fetch with promises to an endpoint path, and with the option passed through props */
  const fetchTMDB = useCallback(
    async (signal) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(endpointPath, {
          signal: signal,
          ...options,
        });

        if (!response.ok) {
          throw new Error("Request failed...");
        }

        const data = await response.json();

        setData(data);
        setIsLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
    },
    [endpointPath, options]
  );

  /* Call the fetch function on mount, and manage the cleanup with an AbortController */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchTMDB(signal);

    if (error !== null) {
      throw error;
    }

    return () => {
      controller.abort();
    };
  }, [fetchTMDB, error]);

  return { data, isLoading, error };
};

export default useFetch;
