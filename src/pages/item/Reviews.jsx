import React from 'react';
import propTypes from 'prop-types';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';

/**
 * Creates the latest review view for the item page.
 * @returns view for latest reviews
 */
const Reviews = (props) => {
  const { reviews } = props;
  return (
    <div className="reviews">
      <div className="reviews__header">
        <div className="reviews__header__text"> Reviews </div>
      </div>
      <div className="reviews__reviews">
        <ReviewsList reviews={reviews} />
      </div>
      <div className="reviews__pagination">
        <Pagination />
      </div>
    </div>
  );
};

Reviews.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

Reviews.defaultProps = {
  reviews: null,
};

export default Reviews;
