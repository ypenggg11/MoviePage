import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <React.Fragment>
      <TextField
        id='search-bar-with-icon'
        InputProps={{
          endAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant='outlined'
        className="search-bar"
      />
    </React.Fragment>
  );
};

export default SearchBar;
