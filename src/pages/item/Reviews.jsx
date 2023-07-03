import React from 'react';
import propTypes from 'prop-types';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';

/**
 * Creates the latest review component for the item page.
 * @property {JSON} reviews - a JSON object with the reviews used.
 * @property {String} className - Custom className if wanted. Default reviews.
 * @property {String} id - Custom id if wanted. Default reviews.
 * @returns component for latest reviews
 */
const Reviews = (props) => {
  const { reviews } = props;
  const { className } = props;
  const { id } = props;
  return (
    <div className={className} id={id}>
      <div className={`${className}__header`}>
        <div className={`${className}__header__text`}> Reviews </div>
      </div>
      <div className={`${className}__reviews`}>
        <ReviewsList reviews={reviews} />
      </div>
      <div className={`${className}__pagination`}>
        <Pagination />
      </div>
    </div>
  );
};

Reviews.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
};

Reviews.defaultProps = {
  reviews: null,
  className: 'reviews',
  id: 'reviews',
};

export default Reviews;
