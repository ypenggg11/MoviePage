import React from "react";
import { Link, useLocation } from "react-router-dom";

import NavigationButtonComponent from "../UI/NavigationButtonComponent";
import ThemeSwitchComponent from "../UI/ThemeSwitchComponent";

const PaginationComponent = ({ page, maxPages, onSlideChange }) => {
  const { pathname } = useLocation();

  const slideHandler = (type) => {
    onSlideChange(type);
  };

  return (
    <div className="page-nav">
      {/* Page Index */}
      <p className="page-nav__index">{page}</p>
      <span className="page-nav__buttons">
        <ThemeSwitchComponent />
        {/* Prev Page button */}
        {page > 1 && (
          <NavigationButtonComponent
            onClick={() => {
              slideHandler("right");
            }}
          >
            <Link to={`${pathname}?page=${+page - 1}`}>&lt;</Link>
          </NavigationButtonComponent>
        )}
        {/* Next Page button */}
        {page < maxPages && (
          <NavigationButtonComponent
            onClick={() => {
              slideHandler("left");
            }}
          >
            <Link to={`${pathname}?page=${+page + 1}`}>&gt;</Link>
          </NavigationButtonComponent>
        )}
      </span>
    </div>
  );
};

export default PaginationComponent;
