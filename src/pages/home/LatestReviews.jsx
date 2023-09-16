import React from 'react';
import propTypes from 'prop-types';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';

/**
 * Creates the latest review component used on the home page.
 * @property {JSON} reviews - Json object containing the reviews on load.
 * @property {String} className - Custom className if wanted. Default latestReviews.
 * @property {String} id - Custom id if wanted. Default latestReviews.
 * @property {Function} nexPage - The function to be called when next is clicked.
 * @property {Function} prevPage - The function to be called when prev is clicked.
 * @returns latest reviews component
 */
const LatestReviews = ({
  className, id, reviews, nextPage, prevPage,
}) => {
  // if loading reviews.
  if (reviews == null) {
    return (
      <div className={`${className}`}>
        <div className={`${className}__loading`}> loading </div>
      </div>
    );
  // if reviews found.
  } return (
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

LatestReviews.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
  nextPage: propTypes.func,
  prevPage: propTypes.func,
};

LatestReviews.defaultProps = {
  reviews: [],
  className: 'latestReviews',
  id: 'latestReviews',
  nextPage: null,
  prevPage: null,
};

export default LatestReviews;
