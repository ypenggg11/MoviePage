import React, { useContext } from "react";
import ThemeContext from "../../store/theme-context";
import ThemeButton from "./ThemeButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <React.Fragment>
      <AppBar position='fixed' sx={{ bgcolor: "unset" }}>
        <Toolbar
          className={`header-container ${
            !themeContext.isDarkTheme ? "header-container--light-theme" : ""
          }`}
        >
          <IconButton onClick={loginHandler}>
            <AccountCircleIcon
              fontSize='large'
              className='header-container__item'
            />
          </IconButton>
          <ThemeButton />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
