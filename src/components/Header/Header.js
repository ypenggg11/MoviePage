import React, { useContext } from "react";
import ThemeContext from "../../store/theme-context";
import ThemeButton from "./ThemeButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeMaxIcon from "@mui/icons-material/HomeMax";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import PageNav from "../PageNav/PageNav";

/* Renders the header of our page */
const Header = () => {
  const themeContext = useContext(ThemeContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const renderNav = pathname === "/";

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <React.Fragment>
      {/* Header */}
      <AppBar position='fixed' sx={{ bgcolor: "unset" }}>
        {/* Header content */}
        <Toolbar
          className={`header-container ${
            !themeContext.isDarkTheme ? "header-container--light-theme" : ""
          }`}
        >
          {/* Left items (Home & Account button) */}
          <div>
            <IconButton
              onClick={() => {
                navigate("/");
              }}
              className='header-container--hover'
            >
              <HomeMaxIcon
                fontSize='large'
                className='header-container__item'
              />
              <span className='header-container__item-text'>Home</span>
            </IconButton>
            <IconButton
              onClick={loginHandler}
              className='header-container--hover'
              aria-label='account-icon'
            >
              <AccountCircleIcon
                fontSize='large'
                className='header-container__item'
              />
              <span className='header-container__item-text'>Account</span>
            </IconButton>
          </div>
          {/* Right items (Theme button & navigation buttons) */}
          <div className='header-container__item--right'>
            <ThemeButton />
            {renderNav && <PageNav />}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
