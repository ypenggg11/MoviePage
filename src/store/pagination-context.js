import React from "react";

const PaginationContext = React.createContext({
  page: 1,
  maxPages: 500,
  slideType: null,
  slideChangeHandler: ()=>{},
});

export default PaginationContext;
