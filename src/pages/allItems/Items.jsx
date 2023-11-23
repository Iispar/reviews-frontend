import React from 'react';
import propTypes from 'prop-types';
import Pagination from '../../components/Pagination';
import ItemList from '../../components/ItemList';
import LargeItem from '../../components/LargeItem';
import SearchField from '../../components/SearchField';
import DropDownSortMenu from '../../components/DropDownSortMenu';
import LoadingBar from '../../components/LoadingBar';
import SkeletonLoad from '../../components/SkeletonLoad';

/**
 * Renders the items component on the allItems page
 * @property {JSON} items - JSON object that contains all the items.
 * @property {String} className - custom className if wanted. Default items.
 * @property {String} id - custom id if wanted. Default items.
 * @property {Function} onSubmit - the onSubmit function to be used when submitted.
 * @property {Function} setSort - the set function when sort is selected.
 * @property {Function} setSearch - the set function when search is modified.
 * @property {SFunctiontring} nextPage - the function to be called when next page is clicked.
 * @property {Function} prevPage - the function to be called when previous page is clicked.
 * @property {Boolean} clearInput - the clear input function to be used.
 * @property {Integer} loading - the state of lodaing. 0 is loaded, 1 is inital load
 *                               and 2 is loading data.
 * @property {Boolean} prevDisabled - if the prev button is disabled.
 * @property {Boolean} nextDisabled - if the prev button is disabled.
 * @returns items component.
 */
const Items = ({
  items,
  className,
  id,
  onSubmit,
  setSort,
  setSearch,
  nextPage,
  prevPage,
  clearInput,
  loading,
  nextDisabled,
  prevDisabled,
}) => {
  if (loading === 1) return (<SkeletonLoad />);
  if (loading === 2 || loading === 3) {
    return (
      <div className={className} id={id}>
        <div className={`${className}__header`}>
          <form className={`${className}__header__search`} onSubmit={(e) => onSubmit(e)}>
            <SearchField placeholder="Search" onChange={setSearch} onClear={clearInput} id="allItemsSearch" />
          </form>
          <DropDownSortMenu setSort={(sort, sortDir) => setSort(sort, sortDir)} />
        </div>
        <div className="loading" id="loading">
          {loading === 2 ? (<LoadingBar />) : (<div>error ocurred, please reload</div>)}
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
    );
  }
  return (
    <div className={className} id={id}>
      <div className={`${className}__header`}>
        <form className={`${className}__header__search`} onSubmit={(e) => onSubmit(e)}>
          <SearchField placeholder="Search" onChange={setSearch} onClear={clearInput} id="allItemsSearch" />
        </form>
        <DropDownSortMenu setSort={(sort, sortDir) => setSort(sort, sortDir)} />
      </div>
      { items.length > 0 ? (
        <div className={`${className}__reviews`}>
          <div className={`${className}__reviews__list`} id={`${id}__reviews__list`}>
            <ItemList items={items} View={LargeItem} count={6} />
          </div>
        </div>
      ) : (
        <div className={`${className}__empty`}> no items </div>
      )}
      <div className={`${className}__reviews__pagination`}>
        <Pagination
          next={() => nextPage()}
          prev={() => prevPage()}
          nextDisabled={nextDisabled}
          prevDisabled={prevDisabled}
        />
      </div>
    </div>
  );
};

Items.propTypes = {
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
  setSearch: propTypes.func,
  onSubmit: propTypes.func,
  setSort: propTypes.func,
  nextPage: propTypes.func,
  prevPage: propTypes.func,
  clearInput: propTypes.func,
  loading: propTypes.number,
  prevDisabled: propTypes.bool,
  nextDisabled: propTypes.bool,
};

Items.defaultProps = {
  items: null,
  className: 'items',
  id: 'items',
  setSearch: null,
  onSubmit: null,
  setSort: null,
  nextPage: null,
  prevPage: null,
  clearInput: null,
  loading: 0,
  prevDisabled: true,
  nextDisabled: true,
};

export default Items;
