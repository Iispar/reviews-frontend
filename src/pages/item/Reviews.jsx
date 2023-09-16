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
  reviews, className, id, setSort, nextPage, prevPage, onSubmit, setSearch, clearSearch,
}) => {
  if (reviews == null) {
    return (
      <div className={className}>
        <div className={`${className}__loading`}> loading </div>
      </div>
    );
  }
  return (
    <div className={className} id={id}>
      <div className={`${className}__header`}>
        <div className={`${className}__header__text`}> Reviews </div>
        <div className={`${className}__header__filters`}>
          <form className={`${className}__header__filter__search`} onSubmit={(e) => onSubmit(e)}>
            <SearchField id="itemReviewsSearch" placeholder="Search" onChange={setSearch} onClear={clearSearch} />
          </form>
          <DropDownSortMenu setSort={(sort, sortDir) => setSort(sort, sortDir)} sortOne="date" />
        </div>
      </div>
      { reviews.length > 0 ? (
        <div className={`${className}__reviews`}>
          <div className={`${className}__reviews__list`}>
            <ReviewsList reviews={reviews} />
          </div>
          <div className={`${className}__reviews__pagination`}>
            <Pagination next={() => nextPage()} prev={() => prevPage()} />
          </div>

        </div>
      ) : (
        <div className={`${className}__empty`}> no reviews </div>
      )}
    </div>
  );
};

Reviews.propTypes = {
  reviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
  setSort: propTypes.func,
  nextPage: propTypes.func,
  prevPage: propTypes.func,
  onSubmit: propTypes.func,
  setSearch: propTypes.func,
  clearSearch: propTypes.func,
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
  clearSearch: null,
};

export default Reviews;
