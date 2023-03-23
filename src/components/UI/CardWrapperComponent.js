import React from "react";

/* Card wrapper, used as container for styling only */
const CardWrapperComponent = (props) => {
  const style = props?.className;

  return <div className={`card ${style ? style : ""}`}>{props.children}</div>;
};

export default CardWrapperComponent;
