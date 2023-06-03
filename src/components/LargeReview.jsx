import React from 'react';
import propTypes from 'prop-types';

/**
 * Creates a singular large review.
 * @param {*} props
 * @returns singular large review
 */
const LargeReview = (props) => {
  const { rating } = props;
  const { body } = props;
  return (
    <div className="largeReview">
      <div className="largeReview__body">
        {body}
      </div>
      <div className="largeReview__rating">
        {rating}
      </div>
    </div>
  );
};

LargeReview.propTypes = {
  body: propTypes.string,
  rating: propTypes.number,
};

LargeReview.defaultProps = {
  body: null,
  rating: null,
};

export default LargeReview;
