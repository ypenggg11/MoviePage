import { useState, useCallback, useEffect } from "react";

/* Custom hook for data fetch (TODO: handle error && loading states) */
const useFetch = (endpointPath, options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchTMDB = useCallback(
    async (signal) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(endpointPath, {
          signal: signal,
          ...options
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
