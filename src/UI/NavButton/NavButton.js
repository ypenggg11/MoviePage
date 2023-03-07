import React from "react";

import styles from "./NavButton.module.css";

/* Button wrapper used for navigation */
const NavButton = (props) => {
  return (
    <button onClick={props.onClick} className={styles.navButton}>
      {props.children}
    </button>
  );
};

export default NavButton;
