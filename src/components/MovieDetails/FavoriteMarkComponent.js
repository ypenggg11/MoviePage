import React from "react";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

/* Checkbox with a Favorite icon */
export const FavoriteMarkComponent = ({ onChange, isChecked }) => {
  return (
    <Checkbox
      inputProps={{ "aria-label": "favorite-checkbox" }}
      icon={<FavoriteBorder aria-label="unchecked-icon"/>}
      checkedIcon={<Favorite sx={{ color: "rgb(255, 49, 49)" }} aria-label="checked-icon"/>}
      sx={{ marginLeft: "0.3em" }}
      onChange={onChange}
      checked={isChecked}
    />
  );
};