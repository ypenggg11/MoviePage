import React, {useContext} from "react";
import { Link, useLocation } from "react-router-dom";

import NavButton from "../../UI/NavButton";
import PaginationContext from "../../store/pagination-context";

/* Displays an index of the page, and two button for navigate back or forward */
const PageNav = () => {
  const { page, maxPages, slideChangeHandler } = useContext(PaginationContext);
  const { pathname } = useLocation();
  
  return (
    <div className="page-nav">
      {/* Page Index */}
      <p className="page-nav__index">{page}</p>
      <span className="page-nav__buttons">
        {/* Prev Page button */}
        {page > 1 && (
          <NavButton
            onClick={() => {
              slideChangeHandler("right");
            }}
            aria-label="left-nav"
          >
            <Link to={`${pathname}?page=${+page - 1}`}>&lt;</Link>
          </NavButton>
        )}
        {/* Next Page button */}
        {page < maxPages && (
          <NavButton
            onClick={() => {
              slideChangeHandler("left");
            }}
            aria-label="right-nav"
          >
            <Link to={`${pathname}?page=${+page + 1}`}>&gt;</Link>
          </NavButton>
        )}
      </span>
    </div>
  );
};

export default PageNav;
