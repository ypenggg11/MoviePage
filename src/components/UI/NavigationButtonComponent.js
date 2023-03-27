import React from "react";

/* Button wrapper used for navigation */
export const NavigationButtonComponent = (props) => {
  return (
    <button onClick={props.onClick} className="nav-button">
      {props.children}
    </button>
  );
};