import React, { useContext } from "react";
import DetailsContext from "../../store/details-context";

import styles from "./ImageDisplay.module.css";
import Card from "../../UI/Card/Card";
import NavButton from "../../UI/NavButton/NavButton";

const ImageDisplay = (props) => {
  const detailContext = useContext(DetailsContext);

  return (
    <div className={styles["image-display"]}>
      <Card>
        <img src={props.image} alt={"Image of " + props.title} className={styles.image}/>
      </Card>
      <a href={props.homepage} target="_blank" rel="noreferrer">Website</a>
      <NavButton onClick={detailContext.onHideDetailHandler}>Back</NavButton>
    </div>
  );
};

export default ImageDisplay;
