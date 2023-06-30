import React from 'react';
import propTypes from 'prop-types';
import LargeReview from './LargeReview';

/**
 * component to render a list of reviews in the large format.
 * @param {json} reviews
 *        Reviews in json format. Includes the reviews key, body, rating, id, title and date.
 * @param {string} className
 *        Custom className if wanted. Default ReviewsList.
 * @returns list of reviews
 */
const ReviewsList = (props) => {
  const { reviews } = props;
  const { className } = props;
  const list = [];
  for (let i = 0; i < reviews.length; i += 1) {
    const review = reviews[i];
    list.push(
      <LargeReview
        key={review.key}
        body={review.body}
        rating={review.rating}
        id={review.id}
        title={review.title}
        date={review.date}
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
  reviews: null,
  className: 'reviewsList',
};

export default ReviewsList;
