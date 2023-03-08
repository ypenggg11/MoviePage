import React from "react";
import { Link, useLocation } from "react-router-dom";

import NavButton from "../../UI/NavButton/NavButton";

import styles from "./PageNav.module.css";

const PageNav = ({ page, maxPages }) => {
  const { pathname } = useLocation();

  return (
    <div className={styles.pageNav}>
      {/* Page Index */}
      <p className={styles.pageIndex}>{page}</p>

      {/* Prev Page button */}
      {page > 1 && (
        <Link to={`${pathname}?page=${+page - 1}`}>
          <NavButton>←</NavButton>
        </Link>
      )}

      {/* Next Page button */}
      {page < maxPages && (
        <Link to={`${pathname}?page=${+page + 1}`}>
          <NavButton>→</NavButton>
        </Link>
      )}
    </div>
  );
};

export default PageNav;
