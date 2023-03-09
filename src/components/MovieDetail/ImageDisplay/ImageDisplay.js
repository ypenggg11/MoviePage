import React from "react";

import styles from "./ImageDisplay.module.css";
import Card from "../../../UI/Card/Card";

const ImageDisplay = (props) => {

  const addFallbackImage = (ev) => {
    ev.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
  };

  return (
    <div className={styles["image-display"]}>
      <Card>
        <img src={props.image} loading="lazy" alt={"Image of " + props.title} className={styles.image} onError={addFallbackImage}/>
      </Card>
      <a href={props.homepage} target="_blank" rel="noreferrer">Watch</a>
    </div>
  );
};

export default ImageDisplay;
