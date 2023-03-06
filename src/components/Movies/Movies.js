import React, { useState, useCallback } from "react";

import MoviesList from "./MoviesList/MoviesList";
import PageNav from "../PageNav/PageNav";

const Movies = () => {
    // TODO: Create page context, prevent page state re-render by App.js
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();

  const maxPageHandler = useCallback((pages) => {
    setMaxPage(pages);
  }, []);

  const prevPageHandler = () => {
    setPage((prevState) => {
        if (prevState > 1) {
            return prevState - 1;
          } else {
            return 1;
          }
    });
  };

  const nextPageHandler = () => {
    setPage((prevState) => {
      if (prevState < maxPage) {
        return prevState + 1;
      } else {
        return maxPage;
      }
    });
  };


  return (
    <React.Fragment>
      <MoviesList page={page} onMaxPageChange={maxPageHandler} />
      <PageNav
        page={page}
        onPageChangeToPrev={prevPageHandler}
        onPageChangeToNext={nextPageHandler}
      />
    </React.Fragment>
  );
};

export default Movies;
