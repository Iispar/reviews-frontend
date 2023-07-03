import React from 'react';
import propTypes from 'prop-types';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';

/**
 * Creates the latest review component used on the home page.
 * @property {JSON} reviews - Json object containing the displayed reviews.
 * @property {String} className - Custom className if wanted. Default latestReviews.
 * @property {String} id - Custom id if wanted. Default latestReviews.
 * @returns latest reviews component
 */
const LatestReviews = (props) => {
  const { className } = props;
  const { id } = props;
  const { reviews } = props;

  return (
    <div className={`${className}`}>
      <div className={`${className}__header`} id={`${id}__header`}>
        <div className={`${className}__header__text`}> Latest reviews </div>
      </div>
      <div className={`${className}__reviews`} id={`${id}__reviews`}>
        <ReviewsList reviews={reviews} />
      </div>
      <div className={`${className}__pagination`} id={`${id}__pagination`}>
        <Pagination />
      </div>
    </div>
  );
};

LatestReviews.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
};

LatestReviews.defaultProps = {
  reviews: null,
  className: 'latestReviews',
  id: 'latestReviews',
};

export default LatestReviews;
