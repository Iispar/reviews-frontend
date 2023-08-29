/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';
import reviewsService from '../../services/reviewsService';

/**
 * Creates the latest review component for the item page.
 * @property {JSON} reviews - a JSON object with the reviews used.
 * @property {String} className - Custom className if wanted. Default reviews.
 * @property {String} id - Custom id if wanted. Default reviews.
 * @returns component for latest reviews
 */
const Reviews = ({
  reviews, className, id, setSort, setSortDir, nextPage, prevPage,
}) => (
  <div className={className} id={id}>
    <div className={`${className}__header`}>
      <div className={`${className}__header__text`}> Reviews </div>
    </div>
    <div className={`${className}__reviews`}>
      <ReviewsList reviews={reviews} />
    </div>
    <div className={`${className}__pagination`}>
      <Pagination next={() => nextPage()} prev={() => prevPage()} />
    </div>
  </div>
);

Reviews.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
  setSort: propTypes.func,
  setSortDir: propTypes.func,
  nextPage: propTypes.func,
  prevPage: propTypes.func,

};

Reviews.defaultProps = {
  reviews: null,
  className: 'reviews',
  id: 'reviews',
  setSort: 'none',
  setSortDir: 'none',
  nextPage: null,
  prevPage: null,
};

export default Reviews;
