import React from 'react';
import propTypes from 'prop-types';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';
import SearchField from '../../components/SearchField';
import DropDownSortMenu from '../../components/DropDownSortMenu';
import SkeletonLoad from '../../components/SkeletonLoad';
import LoadingBar from '../../components/LoadingBar';

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
 * @property {Integer} loading - The state of loading. 0 is loaded, 1 is initial load
 *                               and 2 is loading data.
 * @property {Bool} prevDisabled - If prev button is disabled
 * @property {Bool} nextDisabled - If next button is disabled
 * @returns component for latest reviews
 */
const Reviews = ({
  reviews,
  className,
  id,
  setSort,
  nextPage,
  prevPage,
  onSubmit,
  setSearch,
  clearSearch,
  loading,
  nextDisabled,
  prevDisabled,
}) => {
  if (loading === 1 || loading === 2 || loading === 3) {
    if (loading === 1) {
      return (
        <SkeletonLoad />
      );
    }
    return (
      <div className={`${className}`}>
        <div className={`${className}__header`}>
          <div className={`${className}__header__text`}> Reviews </div>
          <div className={`${className}__header__filters`}>
            <form className={`${className}__header__filter__search`} onSubmit={(e) => onSubmit(e)}>
              <SearchField id="itemReviewsSearch" placeholder="Search" onChange={setSearch} onClear={clearSearch} />
            </form>
            <DropDownSortMenu setSort={(sort, sortDir) => setSort(sort, sortDir)} sortOne="date" />
          </div>
        </div>
        <div className={`${className}__reviews`}>
          <div className="loading">
            {loading === 2 ? (<LoadingBar />) : (<div>error ocurred, please reload</div>)}
          </div>
          <div className={`${className}__reviews__pagination`} id={`${id}__pagination`}>
            <Pagination next={() => nextPage()} prev={() => prevPage()} id="pagination" nextDisabled={nextDisabled} prevDisabled={prevDisabled} />
          </div>
        </div>
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
            <Pagination
              next={() => nextPage()}
              prev={() => prevPage()}
              nextDisabled={nextDisabled}
              prevDisabled={prevDisabled}
            />
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
  loading: propTypes.number,
  prevDisabled: propTypes.bool,
  nextDisabled: propTypes.bool,
};

Reviews.defaultProps = {
  reviews: null,
  className: 'reviews',
  id: 'reviews',
  setSort: null,
  nextPage: null,
  prevPage: null,
  onSubmit: null,
  setSearch: null,
  clearSearch: null,
  loading: 0,
  prevDisabled: false,
  nextDisabled: false,
};

export default Reviews;
