/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import propTypes from 'prop-types';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';
import SearchField from '../../components/SearchField';

/**
 * Creates the latest review component for the item page.
 * @property {JSON} reviews - a JSON object with the reviews used.
 * @property {String} className - Custom className if wanted. Default reviews.
 * @property {String} id - Custom id if wanted. Default reviews.
 * @returns component for latest reviews
 */
const Reviews = ({
  reviews, className, id, setSort, setSortDir, nextPage, prevPage, onSubmit, setSearch,
}) => (
  <div className={className} id={id}>
    <div className={`${className}__header`}>
      <div className={`${className}__header__text`}> Reviews </div>
    </div>
    <div className={`${className}__filters`}>
      <form className={`${className}__filter__search`} onSubmit={(e) => onSubmit(e)}>
        <SearchField placeholder="Search" onChange={setSearch} />
      </form>
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
  onSubmit: propTypes.func,
  setSearch: propTypes.func,
};

Reviews.defaultProps = {
  reviews: null,
  className: 'reviews',
  id: 'reviews',
  setSort: 'none',
  setSortDir: 'none',
  nextPage: null,
  prevPage: null,
  onSubmit: null,
  setSearch: null,
};

export default Reviews;
