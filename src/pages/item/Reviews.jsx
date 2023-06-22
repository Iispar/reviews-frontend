import React from 'react';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';
import dummyReviews from '../../data/dummyData/dummyReviews.json';

/**
 * Creates the latest review view for the item page.
 * @returns view for latest reviews
 */
const Reviews = () => {
  const { reviews } = dummyReviews;
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

export default Reviews;
