import React from 'react';
import propTypes from 'prop-types';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';

/**
 * Creates the latest review view for the home page.
 * @returns view for latest reviews
 */
const LatestReviews = (props) => {
  const { reviews } = props;
  return (
    <div className="latestReviews">
      <div className="latestReviews__header">
        <div className="latestReviews__header__text"> Latest reviews </div>
      </div>
      <div className="latestReviews__reviews">
        <ReviewsList reviews={reviews} />
      </div>
      <div className="latestReviews__pagination">
        <Pagination />
      </div>
    </div>
  );
};

LatestReviews.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

LatestReviews.defaultProps = {
  reviews: null,
};

export default LatestReviews;
