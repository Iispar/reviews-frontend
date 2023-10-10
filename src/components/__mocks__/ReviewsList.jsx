/* eslint-disable react/prop-types */
import React from 'react';

const ReviewsList = ({ reviews, className, id }) => {
  const list = [];

  for (let i = 0; i < reviews.length; i += 1) {
    const review = reviews[i];
    list.push(
      <div key={i}>
        {review.body}
        <br />
        {review.rating}
        <br />
        {review.id}
        <br />
        {review.title}
        <br />
        {review.date}
        <br />
        {review.itemId}
        <br />
      </div>,
    );
  }
  return (
    <div className={className} id={id}>
      {list}
    </div>
  );
};

export default ReviewsList;
