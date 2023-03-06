import { useCallback } from "react";

const useFetch = () => {
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);

  const fetchMovie = useCallback(async (fetchURL, sendDataFunc) => {
    //setIsLoading(true);
    //setError(null);
    try {
      const response = await fetch(fetchURL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      sendDataFunc(data);
    } catch (error) {
      //setError(error.message || "Something went wrong!");
    }
    //setIsLoading(false);
  }, []);

  return { fetchMovie };
};

export default useFetch;
