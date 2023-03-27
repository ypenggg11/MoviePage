import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import PaginationContext from "../../store/pagination-context";

import {NavigationButtonComponent} from "../../components";

/* Displays the current page index, and two button for navigate back or forward */
export const PaginationComponent = () => {
  const { page, maxPages, slideChangeHandler } = useContext(PaginationContext);
  const { pathname } = useLocation();

  return (
    <div className='page-nav'>
      {/* Page Index */}
      <p className='page-nav__index'>{page}</p>
      <span className='page-nav__buttons'>
        {/* Prev Page button */}
        {page > 1 && (
          <NavigationButtonComponent
            onClick={() => {
              slideChangeHandler("right");
            }}
            aria-label='left-nav'
          >
            <Link to={`${pathname}?page=${+page - 1}`}>&lt;</Link>
          </NavigationButtonComponent>
        )}
        {/* Next Page button */}
        {page < maxPages && (
          <NavigationButtonComponent
            onClick={() => {
              slideChangeHandler("left");
            }}
            aria-label='right-nav'
          >
            <Link to={`${pathname}?page=${+page + 1}`}>&gt;</Link>
          </NavigationButtonComponent>
        )}
      </span>
    </div>
  );
};