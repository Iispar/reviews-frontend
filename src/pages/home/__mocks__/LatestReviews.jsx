import React from 'react';
import SkeletonLoad from '../../components/SkeletonLoad';

const LatestReviews = ({
  className, id, reviews, nextPage, prevPage, loading,
}) => {
  const reviewList = [];

  for (let i = 0; i < reviews.length; i += 1) {
    reviewList.push(
        <div>
            {reviews[i]}
        </div>,
    );
  }
  // if reviews being loaded.
  if (loading !== 0) {
    // if page load
    if (loading === 1) {
      return (<SkeletonLoad />);
    }
    // else waiting for data.
    return (
      <div className={`${className}`}>
        <div className={`${className}__header`} id={`${id}__header`}>
          <div className={`${className}__header__text`}> Latest reviews </div>
        </div>
        <div className={`${className}__reviews`}>
          <div className="loading">
            loading
          </div>
          <div className={`${className}__reviews__pagination`} id={`${id}__pagination`}>
            <Pagination next={() => nextPage()} prev={() => prevPage()} id="pagination" />
          </div>
        </div>
      </div>
    );
  }
  // no waiting
  return (
    <div className={`${className}`}>
      <div className={`${className}__header`} id={`${id}__header`}>
        <div className={`${className}__header__text`}> Latest reviews </div>
      </div>
      {reviews.length > 0 ? (
        <div className={`${className}__reviews`}>
          <div className={`${className}__reviews__list`} id={`${id}__reviews`}>
            <ReviewsList reviews={reviews} />
          </div>
          <div className={`${className}__reviews__pagination`} id={`${id}__pagination`}>
            <Pagination next={() => nextPage()} prev={() => prevPage()} id="pagination" />
          </div>
        </div>
      ) : (
        <div className={`${className}__empty`}> no reviews </div>
      )}
    </div>
  );
};
