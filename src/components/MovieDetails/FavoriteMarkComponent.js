import React from "react";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const FavouriteMarkComponent = ({ onChange, isChecked }) => {
  return (
    <Checkbox
      inputProps={{ "aria-label": "Favourite Checkbox" }}
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite sx={{ color: "rgb(255, 49, 49)" }} />}
      sx={{ marginLeft: "0.3em" }}
      onChange={onChange}
      checked={isChecked}
    />
  );
};

export default FavouriteMarkComponent;
