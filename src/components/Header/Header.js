import React, { useContext, useRef } from "react";
import ThemeContext from "../../store/theme-context";
import AuthContext from "../../store/auth-context";
import ThemeButton from "./ThemeButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import AuthModal from "../AuthModal/AuthModal";

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const authContext = useContext(AuthContext);
  const authRef = useRef();

  const loginHandler = () => {
    if (!authContext.isLoggedIn) {
      authRef.current.openModal();
    }
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
          <AuthModal ref={authRef}/>
          <ThemeButton />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
