import React from 'react';
import propTypes from 'prop-types';
import LargeReview from './LargeReview';

/**
 * component to render a list of reviews in the large format.
 * @property {json} reviews - Reviews in json format.
 * Includes the reviews key, body, rating, id, title and date.
 * @property {string} className - Custom className if wanted. Default ReviewsList.
 * @returns list of reviews
 */
const ReviewsList = ({ reviews, className }) => {
  const list = [];
  if (reviews == null) {
    return null;
  }
  for (let i = 0; i < reviews.length; i += 1) {
    const review = reviews[i];
    list.push(
      <LargeReview
        key={review.id}
        body={review.body}
        rating={review.rating}
        id={review.id}
        title={review.title}
        date={review.date}
        item={review.item.id}
      >
        {reviews[i]}
      </LargeReview>,
    );
  }
  return (
    <div className={className}>
      {list}
    </div>
  );
};

ReviewsList.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
};

ReviewsList.defaultProps = {
  reviews: [],
  className: 'reviewsList',
};

export default ReviewsList;
