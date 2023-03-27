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

export const SearchBarComponent = React.memo(({ onChange }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const search$ = useMemo(() => new BehaviorSubject(""), []);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

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
          navigate(pathname + "?page=" + 1);
        } else {
          onChange(getPopularMoviesUrl());
        }
      });

    return () => {
      sub.unsubscribe();
    };
  }, [search$, onChange, pathname, navigate]);

  const changeSearchHandler = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue ? searchValue : "");
    search$.next(searchValue);
  };

  const clearHandler = () => {
    setSearchValue("");
    search$.next("");
    navigate(pathname + "?page=" + 1);
  };

  return (
    <TextField
      id='search-bar-with-icon'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={clearHandler}>
              <ClearIcon className={`search-bar__clear-icon ${!isDarkTheme ? "search-bar--light-theme__clear-icon" : ""}`} />
            </IconButton>
            <SearchIcon className={`search-bar__search-icon ${!isDarkTheme ? "search-bar--light-theme__search-icon" : ""}`} />
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
