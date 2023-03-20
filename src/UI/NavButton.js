import React from "react";

/* Button wrapper used for navigation */
const NavButton = (props) => {
  return (
    <button {...props} className="nav-button" >
      {props.children}
    </button>
  );
};

export default NavButton;
