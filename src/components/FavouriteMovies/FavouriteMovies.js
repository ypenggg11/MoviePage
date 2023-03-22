import React, {
    useContext,
    Suspense,
    useState,
    useEffect,
  } from "react";
  
  import { addPageParam, getFavouriteMovies} from "../../services/api-config";
  
  import { ErrorBoundary } from "react-error-boundary";
  import ThemeContext from "../../store/theme-context";
  import Loader from "../../UI/Loader";
  import ErrorFallback from "../Error/ErrorFallback";
  import useFetch from "../../hooks/useFetch";
  import PaginationContext from "../../store/pagination-context";
import AuthContext from "../../store/auth-context";
  
  const MoviesList = React.lazy(() => import("../Movies/MoviesList"));
  
  /* Component that fetch the popular movies from the API and pass the list to it child for render */
  const FavouriteMovies = () => {
    const themeContext = useContext(ThemeContext);
    const authContext = useContext(AuthContext);
    const { page, updateMaxPage } = useContext(PaginationContext);
  
    const [movies, setMovies] = useState([]);
  
    /* Custom hook for data fetch */
    const { data, isLoading } = useFetch(addPageParam(getFavouriteMovies(authContext.sessionId), page));
  
    /* Once the data was fetched successfully, update the popular movies state */
    useEffect(() => {
      if (data !== null) {
        if (!data.results.length > 0) {
          // Handle something if no movie was found
          updateMaxPage(1);

          return;
        }
  
        const movies = data.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            popularity: movie.popularity,
          };
        });
  
        updateMaxPage(data.total_pages);
  
        setMovies(movies);
      }
  
      return () => {};
    }, [data, updateMaxPage]);
  
    /* If an error occurs (fetch fails...), show a fallback component instead of it childs */
    return (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <div
          className={`movies-container ${
            !themeContext.isDarkTheme ? "movies-container--light-theme" : ""
          }`}
        >
          <Suspense fallback={<Loader />}>
            {!isLoading ? <MoviesList movies={movies} /> : <Loader />}
          </Suspense>
        </div>
      </ErrorBoundary>
    );
  };
  
  export default FavouriteMovies;
  