import React from "react";

import styles from "./Card.module.css";

/* Card wrapper, used as container for styling only */
const Card = (props) => {
  const style = props?.className;

  return <div className={`${styles.card} ${style && style}`}>{props.children}</div>;
};

export default Card;
