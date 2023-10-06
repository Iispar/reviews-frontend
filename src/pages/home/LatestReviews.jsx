import React from 'react';
import propTypes from 'prop-types';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';
import SkeletonLoad from '../../components/SkeletonLoad';
import LoadingBar from '../../components/LoadingBar';

/**
 * Creates the latest review component used on the home page.
 * @property {JSON} reviews - Json object containing the reviews on load.
 * @property {String} className - Custom className if wanted. Default latestReviews.
 * @property {String} id - Custom id if wanted. Default latestReviews.
 * @property {Function} nexPage - The function to be called when next is clicked.
 * @property {Function} prevPage - The function to be called when prev is clicked.
 * @property {integer} loading - if loading is active. 0 if no loading, 1 if initial
 *                               and 2 if retrieving data.
 * @returns latest reviews component
 */
const LatestReviews = ({
  className, id, reviews, nextPage, prevPage, loading,
}) => {
  // if page load
  if (loading === 1) return (<SkeletonLoad />);
  // else waiting for data.
  if (loading === 2 || loading === 3) {
    return (
      <div className={`${className}`}>
        <div className={`${className}__header`} id={`${id}__header`}>
          <div className={`${className}__header__text`}> Latest reviews </div>
        </div>
        <div className={`${className}__reviews`}>
          <div className="loading">
            {loading === 2 ? (<LoadingBar />) : (<div>error ocurred, please reload</div>)}
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

LatestReviews.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
  nextPage: propTypes.func,
  prevPage: propTypes.func,
  loading: propTypes.number,
};

LatestReviews.defaultProps = {
  reviews: [],
  className: 'latestReviews',
  id: 'latestReviews',
  nextPage: null,
  prevPage: null,
  loading: 0,
};

export default LatestReviews;
