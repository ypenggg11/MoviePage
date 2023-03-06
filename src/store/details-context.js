import React from "react";

const DetailsContext = React.createContext({
  isDetailsShowing: false,
  movieIdToShow: undefined,
  onShowDetailHandler: () => {},
  onHideDetailHandler: () => {},
});

export default DetailsContext;
