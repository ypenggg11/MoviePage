import React from "react";

/* Card wrapper, used as container for styling only */
const Card = (props) => {
  const style = props?.className;

  return <div className={`card ${style ? style : ""}`}>{props.children}</div>;
};

export default Card;
