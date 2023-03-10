import React from "react";
import { Link, useLocation } from "react-router-dom";

import NavButton from "../../UI/NavButton";

import ThemeButton from "./ThemeButton";

const PageNav = ({ page, maxPages, onSlideChange }) => {
  const { pathname } = useLocation();

  const slideHandler = (type) => {
    onSlideChange(type);
  };

  return (
    <div className="page-nav">
      {/* Page Index */}
      <p className="page-nav__index">{page}</p>
      <span className="page-nav__buttons">
        <ThemeButton />
        {/* Prev Page button */}
        {page > 1 && (
          <NavButton
            onClick={() => {
              slideHandler("right");
            }}
          >
            <Link to={`${pathname}?page=${+page - 1}`}>&lt;</Link>
          </NavButton>
        )}
        {/* Next Page button */}
        {page < maxPages && (
          <NavButton
            onClick={() => {
              slideHandler("left");
            }}
          >
            <Link to={`${pathname}?page=${+page + 1}`}>&gt;</Link>
          </NavButton>
        )}
      </span>
    </div>
  );
};

export default PageNav;
