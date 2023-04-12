import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";

import PaginationContext from "../../store/pagination-context";

import { NavigationButtonComponent } from "../../components";

/* Displays the current page index, and two button for navigate back or forward */
export const PaginationComponent = () => {
  const { page, maxPages, slideChangeHandler } = useContext(PaginationContext);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className='page-nav'>
      <span className='page-nav__buttons'>
        {/* Prev Page button */}
        {page > 1 && (
          <NavigationButtonComponent
            onClick={() => {
              slideChangeHandler("right");
              setSearchParams({ page: +page - 1 });
            }}
            aria-label='left-nav'
          >
            &lt;
          </NavigationButtonComponent>
        )}
        {/* Page Index */}
        <p className='page-nav__index'>{searchParams.get("page")}</p>
        {/* Next Page button */}
        {page < maxPages && (
          <NavigationButtonComponent
            onClick={() => {
              slideChangeHandler("left");
              setSearchParams({ page: +page + 1 });
            }}
            aria-label='right-nav'
          >
            &gt;
          </NavigationButtonComponent>
        )}
      </span>
    </div>
  );
};
