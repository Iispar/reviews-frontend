/* eslint-disable react/prop-types */
import React from 'react';

const Title = ({
  name, reviewsCount, ratingValue, posReviews, negReviews, className, id,
}) => {
  if (name == null) return null;
  return (
    <div className={`${className}`} id={`${id}`}>
      <div className={`${className}__info`}>
        <div className={`${className}__info__name`} id={`${className}__info__name`}>
          {name}
        </div>
      </div>
      <div className={`${className}__data`}>
        <div className={`${className}__data__reviews`} id={`${className}__data__reviews`}>
          <span className={`${className}__data__reviews__value`}>
            {reviewsCount}
          </span>
          reviews
        </div>
        <div className={`${className}__data__rating`} id={`${className}__data__rating`}>
          <span className={`${className}__data__rating__hover`} id={`${id}__data__rating__hover`}>
            hover
          </span>
          {ratingValue}
          rating
        </div>
        <div className={`${className}__data__positive`} id={`${className}__data__positive`}>
          <span className={`${className}__data__positive__value`}>
            {posReviews}
          </span>
          positive
        </div>
        <div className={`${className}__data__negative`} id={`${className}__data__negative`}>
          <span className={`${className}__data__negative__value`}>
            {negReviews}
          </span>
          negative
        </div>
      </div>
    </div>
  );
};

export default Title;
