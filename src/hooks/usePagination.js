import { useState, useEffect, useMemo } from "react";
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
  const [page, setPage] = useState();
  const maxPages = 500;

  /* Navigate to a specific page on mount or on dependency change  */
  useEffect(() => {
    let cancelled = false;
    const paramPage = pageParams.get("page");
    
    if (!cancelled) {
      /* Handle page param errors */
      if (paramPage < 1 || paramPage > maxPages || isNaN(paramPage)) {
        setPage(1);
        navigate(pathname + "?page=" + 1, { replace: true });
      } else {
        setPage(paramPage);
        navigate(pathname + "?page=" + paramPage, { replace: true });
      }
    }

    return () => {
      cancelled = true;
    };
  }, [pathname, page, navigate, pageParams, maxPages]);

  return { page, maxPages };
};

export default usePagination;
