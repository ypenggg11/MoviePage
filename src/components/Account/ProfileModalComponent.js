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

/* Renders the current logged user profile */
const ProfileModalComponent = ({ account }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isDarkTheme } = useContext(ThemeContext);

  const closeHandler = () => {
    navigate("/");
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
        {/* Future favourite movies button */}
        <DialogContent></DialogContent>
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

export default ProfileModalComponent;
