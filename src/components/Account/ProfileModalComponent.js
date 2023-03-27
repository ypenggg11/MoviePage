import {
  Dialog,
  Card,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ThemeContext from "../../store/theme-context";
import Favorite from "@mui/icons-material/Favorite";

/* Renders the current logged user profile */
export const ProfileModalComponent = ({ account }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isDarkTheme } = useContext(ThemeContext);

  const closeHandler = () => {
    navigate("/");
  };

  const favouritesHandler = () => {
    navigate("/profile/favorites");
  };

  return (
    <Dialog
      open={true}
      onClose={closeHandler}
      sx={{
        bgcolor: isDarkTheme ? "#3f3f3f" : "whitesmoke",
      }}
    >
      <Card>
        {/* Username */}
        <DialogTitle>Welcome back, {account.username} !</DialogTitle>
        {/* Favourite movies button */}
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={favouritesHandler}
            sx={{ color: "black", gap: "10px" }}
          >
            <Favorite sx={{ color: "rgb(255, 49, 49)" }} />
            Favourites
          </Button>
        </DialogContent>
        {/* Back & Logout buttons */}
        <DialogActions>
          <Button onClick={closeHandler} sx={{ color: "black" }}>
            Back
          </Button>
          <Button
            onClick={authContext.logout}
            aria-label='logout'
            sx={{ color: "black" }}
          >
            Logout
          </Button>
        </DialogActions>
      </Card>
    </Dialog>
  );
};
