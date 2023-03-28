import React, { useContext, useEffect, useMemo, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { BehaviorSubject, debounceTime, map } from "rxjs";
import {
  getPopularMoviesUrl,
  getSearchMovieUrl,
} from "../../services/api-requests";
import ThemeContext from "../../store/theme-context";
import { useLocation, useNavigate } from "react-router-dom";

/* Manages the user search with RxJS debounce, that returns a 
   fetch url depending on the search input */
export const SearchBarComponent = React.memo(({ onChange }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  /* Search value behavior subject (observable) */
  const search$ = useMemo(() => new BehaviorSubject(""), []);

  /* Value used as two way binding on the search TextField */
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  /* Subscribe to the search subject, with a debounce and map operators. */
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
          navigate({pathname: pathname, search: "?page=1"});
        } else {
          onChange(getPopularMoviesUrl());
        }
      });

    return () => {
      sub.unsubscribe();
    };
  }, [search$, onChange, pathname, navigate]);

  /* When the textfield input changes, updates the observable and the state */
  const changeSearchHandler = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue ? searchValue : "");
    search$.next(searchValue);
  };

  /* Clears the input */
  const clearHandler = () => {
    setSearchValue("");
    search$.next("");
    navigate({pathname: pathname, search: "?page=1"});
  };

  /* Thext field with a clear icon and a search icon */
  return (
    <TextField
      id='search-bar-with-icon'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={clearHandler}>
              <ClearIcon
                className={`search-bar__clear-icon ${
                  !isDarkTheme ? "search-bar--light-theme__clear-icon" : ""
                }`}
              />
            </IconButton>
            <SearchIcon
              className={`search-bar__search-icon ${
                !isDarkTheme ? "search-bar--light-theme__search-icon" : ""
              }`}
            />
          </InputAdornment>
        ),
      }}
      variant='outlined'
      className={`search-bar ${!isDarkTheme ? "search-bar--light-theme" : ""}`}
      onChange={changeSearchHandler}
      value={searchValue}
    />
  );
});
