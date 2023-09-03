/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import propTypes from 'prop-types';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';
import SearchField from '../../components/SearchField';
import DropDownSortMenu from '../../components/DropDownSortMenu';

/**
 * Creates the reviews component for the item page.
 * @property {JSON} reviews - a JSON object with the reviews used.
 * @property {String} className - Custom className if wanted. Default reviews.
 * @property {String} id - Custom id if wanted. Default reviews.
 * @property {Function} setSort - The function to be called when sort changes.
 * @property {Function} nextPage - The function to be used when next page is clicked.
 * @property {Function} prevPage - The function to be used when previous page is clicked.
 * @property {Function} onSubmit - The function to be used on submit of the search.
 * @property {Function} setSearch - The function to be used on search change.
 * @returns component for latest reviews
 */
const Reviews = ({
  reviews, className, id, setSort, nextPage, prevPage, onSubmit, setSearch,
}) => (
  <div className={className} id={id}>
    <div className={`${className}__header`}>
      <div className={`${className}__header__text`}> Reviews </div>
    </div>
    <div className={`${className}__filters`}>
      <form className={`${className}__filter__search`} onSubmit={(e) => onSubmit(e)}>
        <SearchField placeholder="Search" onChange={setSearch} />
      </form>
      <DropDownSortMenu setSort={(sort, sortDir) => setSort(sort, sortDir)} sortOne="date" />
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
  nextPage: null,
  prevPage: null,
  onSubmit: null,
  setSearch: null,
};

export default Reviews;
