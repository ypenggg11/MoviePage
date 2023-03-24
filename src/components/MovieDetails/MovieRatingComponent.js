import React from "react";

import { Rating } from "@mui/material";

export const MovieRatingComponent = React.memo(({ rateValue, status, onChange }) => {
  return (
    <React.Fragment>
      <Rating
        name='movie-rating'
        defaultValue={rateValue / 2}
        precision={0.5}
        value={rateValue / 2}
        onChange={(event, value) => {
          value !== null && onChange(value);
        }}
        title='movie-rating'
      />
      <p className='detail-container__text--inline'>{rateValue}</p>
      {status.show && (
        <p
          className={`detail-container__text--inline ${rateValue && "pop-in"}`}
        >
          {status.text}
        </p>
      )}
    </React.Fragment>
  );
});