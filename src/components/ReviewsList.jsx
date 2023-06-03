import React from 'react';
import propTypes from 'prop-types';
import LargeReview from './LargeReview';

/**
 * component to render a list of reviews in the large form.
 * @param {*} props
 * @returns list of reviews
 */
const ReviewsList = (props) => {
  const { reviews } = props;
  const list = [];
  for (let i = 0; i < reviews.length; i += 1) {
    const review = reviews[i];
    list.push(
      <LargeReview key={review.key} body={review.body} rating={review.rating}>
        {reviews[i]}
      </LargeReview>,
    );
  }
  return (
    <div className="reviewsList">
      {list}
    </div>
  );
};

ReviewsList.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

ReviewsList.defaultProps = {
  reviews: null,
};

export default ReviewsList;
