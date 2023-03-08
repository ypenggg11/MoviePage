import React from "react";

import styles from "./ImageDisplay.module.css";
import Card from "../../UI/Card/Card";
// import NavButton from "../../UI/NavButton/NavButton";

const ImageDisplay = (props) => {

  return (
    <div className={styles["image-display"]}>
      <Card>
        <img src={props.image} loading="lazy" alt={"Image of " + props.title} className={styles.image}/>
      </Card>
      <a href={props.homepage} target="_blank" rel="noreferrer">Website</a>
      {/* <NavButton onClick={detailContext.onHideDetailHandler}>Back</NavButton> */}
    </div>
  );
};

export default ImageDisplay;
