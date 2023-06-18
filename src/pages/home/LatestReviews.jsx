import React from 'react';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';
import dummyReviews from '../../data/dummyData/dummyReviews.json';

/**
 * Creates the latest review view for the home page.
 * @returns view for latest reviews
 */
const LatestReviews = () => {
  const { reviews } = dummyReviews;
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

export default LatestReviews;
