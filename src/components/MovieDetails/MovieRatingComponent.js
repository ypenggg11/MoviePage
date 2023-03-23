import React from "react";

import { Rating } from "@mui/material";

const MovieRatingComponent = ({ value, status, onChange }) => {
  return (
    <React.Fragment>
      <Rating
        name='movie-rating'
        defaultValue={value / 2}
        precision={0.5}
        value={value / 2}
        onChange={(event, value) => {
          onChange(value);
        }}
        title='movie-rating'
      />
      <p className='detail-container__text--inline'>{value}</p>
      {status.show && (
        <p className={`detail-container__text--inline ${value && "pop-in"}`}>
          {status.text}
        </p>
      )}
    </React.Fragment>
  );
};

export default React.memo(MovieRatingComponent);
