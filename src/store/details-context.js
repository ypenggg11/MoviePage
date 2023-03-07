import React from "react";

/* Context for show or hide the details view from a movie */
const DetailsContext = React.createContext({
  isDetailsShowing: false,
  movieIdToShow: undefined,
  onShowDetailHandler: () => {},
  onHideDetailHandler: () => {},
});

export default DetailsContext;
