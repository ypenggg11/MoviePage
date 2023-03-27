import React from "react";

import { CardWrapperComponent } from "../../components";

/* Renders an image of a movie and a link to that movie official page (if they have) */
export const MoviePosterComponent = (props) => {
  const addFallbackImage = (ev) => {
    ev.target.src =
      "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";
  };

  return (
    <div className='image-display'>
      <CardWrapperComponent>
        <img
          src={props.image}
          loading='lazy'
          alt={"Image of " + props.title}
          className='image-display__img'
          onError={addFallbackImage}
        />
      </CardWrapperComponent>
      <a href={props.homepage} target='_blank' rel='noreferrer'>
        Watch
      </a>
    </div>
  );
};
