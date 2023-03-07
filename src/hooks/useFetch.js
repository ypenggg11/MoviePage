import { useCallback } from "react";

/* Custom hook for data fetch (TODO: handle error && loading states) */
const useFetch = () => {
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);

  /* Fetch the data with the fetchURL arg, and send the result to sendDataFunc() */
  const fetchMovie = useCallback(async (fetchURL, sendDataFunc) => {
    //setIsLoading(true);
    //setError(null);
    try {
      const response = await fetch(fetchURL);
      
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      sendDataFunc(data);

    } catch (error) {
      //setError(error.message || "Something went wrong!");
    }
    //setIsLoading(false);
  }, []);

  return { fetchMovie };
};

export default useFetch;
