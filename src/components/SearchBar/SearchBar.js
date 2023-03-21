import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const changeSearchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <TextField
      id='search-bar-with-icon'
      InputProps={{
        endAdornment: (
          <InputAdornment position='start'>
            <SearchIcon className='search-bar__icon' />
          </InputAdornment>
        ),
      }}
      variant='outlined'
      className='search-bar'
      value={search}
      onChange={changeSearchHandler}
    />
  );
};

export default SearchBar;
