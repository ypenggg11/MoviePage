import React, { useContext } from "react";
import ThemeContext from "../../store/theme-context";
import ThemeButton from "./ThemeButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeMaxIcon from "@mui/icons-material/HomeMax";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PaginationContext from "../../store/pagination-context";
import PageNav from "../PageNav/PageNav";

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const { page, maxPages, slideChangeHandler } = useContext(PaginationContext);

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
            >
              <AccountCircleIcon
                fontSize='large'
                className='header-container__item'
              />
              <span className='header-container__item-text'>Account</span>
            </IconButton>
          </div>
          <div className='header-container__item--left'>
            <ThemeButton />
            <PageNav
              page={page}
              maxPages={maxPages}
              onSlideChange={slideChangeHandler}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
