import React from "react";

import NavButton from "../../UI/NavButton/NavButton";

import styles from "./PageNav.module.css";

const PageNav = (props) => {
  return (
    <div className={styles.pageNav}>
      {/* Prev Page button */}
      <NavButton onClick={props.onPageChangeToPrev}>&lt;</NavButton>

      {/* Page Index */}
      <p className={styles.pageIndex}>{props.page}</p>

      {/* Next Page button */}
      <NavButton onClick={props.onPageChangeToNext}>&gt;</NavButton>
    </div>
  );
};

export default PageNav;
