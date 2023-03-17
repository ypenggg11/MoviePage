import React, {useState} from "react";
import PaginationContext from "./pagination-context";
import usePagination from "../hooks/usePagination";

const PaginationContextProvider = (props) => {
  const [slideType, setSlideType] = useState();
  const { page, maxPages } = usePagination();

  const slideChangeHandler = (type) => {
    setSlideType(type);
  };

  return (
    <PaginationContext.Provider
      value={{
        page: page,
        maxPages: maxPages,
        slideType: slideType,
        slideChangeHandler: slideChangeHandler,
      }}
    >
      {props.children}
    </PaginationContext.Provider>
  );
};

export default PaginationContextProvider;
