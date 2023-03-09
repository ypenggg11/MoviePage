import React from "react";
import { Link, useLocation } from "react-router-dom";

import NavButton from "../../UI/NavButton/NavButton";

import styles from "./PageNav.module.css";
import ToggleButton from "./ToggleButton";

const PageNav = ({ page, maxPages, onSlideChange }) => {
  const { pathname } = useLocation();

  const slideHandler = (type) => {
    onSlideChange(type);
  };

  return (
    <div className={styles.pageNav}>
      {/* Page Index */}
      <p className={styles.pageIndex}>{page}</p>
      <span className={styles.buttons}>
        <ToggleButton />
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
