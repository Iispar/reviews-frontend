import React from 'react';
import propTypes from 'prop-types';
import LargeReview from './LargeReview';

/**
 * component to render a list of reviews in the large format.
 * @property {json} reviews - Reviews in json format.
 *                            Includes the reviews key, body, rating, id, title and date.
 * @property {String} className - Custom className if wanted. Default ReviewsList.
 * @property {String} id - Custom id if wanted. Default ReviewsList.
 * @returns list of reviews
 */
const ReviewsList = ({ reviews, className, id }) => {
  const list = [];

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
    <div className={className} id={id}>
      {list}
    </div>
  );
};

ReviewsList.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
};

ReviewsList.defaultProps = {
  reviews: [],
  className: 'reviewsList',
  id: 'reviewsList',
};

export default ReviewsList;
