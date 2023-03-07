import { useState, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* Custom hook for manage our pages navigation */
const usePagination = () => {
  /* Get the current path, and 'search' for later get the URL params */
  const { pathname, search } = useLocation();
  /* Allow us navigate to a specific path */
  const navigate = useNavigate();
  /* Get the current page query params */
  const pageParams = useMemo(() => new URLSearchParams(search), [search]);
  /* On mount, set as page param value, or page localstorage item, or 1 as default*/
  const [page, setPage] = useState(
    pageParams.get("page") || localStorage.getItem("page")
  );

  const maxPages = 500;

  /* Navigate to a specific page on mount or on dependency change  */
  useEffect(() => {
    /* Handle page param errors */
    if (page < 1 || page > maxPages || isNaN(page)) {
      setPage(1);
    } else {
      navigate(pathname + "?page=" + page);
    }

    return () => {};
  }, [pathname, page, navigate, pageParams, maxPages]);

  /* Go to the previous page */
  const prevPageHandler = useCallback(() => {
    setPage((prevState) => {
      if (prevState > 1) {
        return prevState - 1;
      } else {
        return 1;
      }
    });
  }, []);

  /* Go to the next page */
  const nextPageHandler = useCallback(() => {
    setPage((prevState) => {
      if (prevState < maxPages) {
        return +prevState + 1;
      } else {
        return maxPages;
      }
    });
  }, [maxPages]);

  return { page, maxPages, prevPageHandler, nextPageHandler };
};

export default usePagination;
