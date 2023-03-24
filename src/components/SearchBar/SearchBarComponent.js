import React, { useContext, useEffect, useMemo, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { BehaviorSubject, debounceTime, map } from "rxjs";
import { getPopularMovies, getSearchMovieUrl } from "../../services/api-requests";
import ThemeContext from "../../store/theme-context";

const SearchBarComponent = ({ onChange }) => {

  // const { page } = useContext(PaginationContext);
  // const navigate = useNavigate();
  // const { pathname } = useLocation();
  // const [fetchUrl, setFetchUrl] = useState();

  // /* Custom hook for data fetch */
  // useEffect(() => {
  //   let cancelled = false;

  //   if (!cancelled) {
  //     setFetchUrl((prevState) => {
  //       if (!prevState.includes("?page=")) {
  //         return addPageParam(prevState, page);
  //       }
  //     });
  //   }

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [page]);

  // const searchChangeHandler = useCallback(
  //   (requestUrl, searchQuery) => {
  //     setFetchUrl(requestUrl);

  //     localStorage.setItem("search", searchQuery ? searchQuery : "");
  //     navigate(pathname + "?page=" + 1, { replace: true });
  //   },
  //   [navigate, pathname]
  // );

  const { isDarkTheme } = useContext(ThemeContext);

  const search$ = useMemo(
    () =>
      new BehaviorSubject(
        localStorage.getItem("search") ? localStorage.getItem("search") : ""
      ),
    []
  );

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const sub = search$
      .pipe(
        debounceTime(500),
        map((string) => string.trim().replaceAll(" ", "%"))
      )
      .subscribe((searchQuery) => {
        setSearchValue(searchQuery.replaceAll("%", " "));

        if (searchQuery.length > 0) {
          onChange(getSearchMovieUrl(searchQuery));
        } else {
          onChange(getPopularMovies());
        }
      });

    return () => {
      sub.unsubscribe();
    };
  }, [search$, onChange]);

  const changeSearchHandler = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue ? searchValue : "");

    if (searchValue.length > 0) {
      search$.next(searchValue);
    } else {
      search$.next(searchValue);
      onChange(getPopularMovies());
    }
  };

  const clearHandler = () => {
    setSearchValue("");
    search$.next("");
    onChange(getPopularMovies());

    localStorage.setItem("search", "");
  };

  return (
    <TextField
      id='search-bar-with-icon'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={clearHandler}>
              <ClearIcon className='search-bar__clear-icon' />
            </IconButton>
            <SearchIcon className='search-bar__search-icon' />
          </InputAdornment>
        ),
      }}
      variant='outlined'
      className={`search-bar ${!isDarkTheme ? "search-bar--light-theme" : ""}`}
      onChange={changeSearchHandler}
      value={searchValue}
    />
  );
};

export default SearchBarComponent;
