import React, { useContext, useState } from "react";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Movies from "./components/Movies/Movies";

import DetailsContext from "./store/details-context";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (newPageIndex) => {
    setCurrentPage(newPageIndex);
  };
  
  const detailsContext = useContext(DetailsContext);

  let component;

  if (detailsContext.isDetailsShowing) {
    component = <MovieDetail movieId={detailsContext.movieIdToShow}/>;
  } else {
    component = <Movies currentPage={currentPage} onPageChange={onPageChange}/>;
  }

  return <React.Fragment>{component}</React.Fragment>;
};

export default App;
