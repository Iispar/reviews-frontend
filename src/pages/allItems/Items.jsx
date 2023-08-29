import { React } from 'react';
import propTypes from 'prop-types';
import Pagination from '../../components/Pagination';
import ItemList from '../../components/ItemList';
import LargeItem from '../../components/LargeItem';
import SearchField from '../../components/SearchField';
import DropDownSortMenu from '../../components/DropDownSortMenu';

/**
 * Renders the items component on the allItems page
 * @propert {JSON} items - JSON object that contains all the items.
 * @propert {String} className - custom className if wanted. Default items.
 * @propert {String} id - custom id if wanted. Default items.
 * @returns items component for ALlItems page
 */
const Items = ({
  items, className, id, onSubmit, setSort, setSearch, nextPage, prevPage,
}) => (
  <div className={className}>
    <div className={`${className}__header`}>
      <form className={`${className}__header__search`} onSubmit={(e) => onSubmit(e)}>
        <SearchField placeholder="Search" onChange={setSearch} />
      </form>
      <DropDownSortMenu setSort={(sort, sortDir) => setSort(sort, sortDir)} />
    </div>
    <div className={`${className}__list`} id={`${id}__list`}>
      <ItemList items={items} View={LargeItem} count={6} />
    </div>
    <div className={`${className}__pagination`}>
      <Pagination next={() => nextPage()} prev={() => prevPage()} />
    </div>
  </div>
);

Items.propTypes = {
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
  setSearch: propTypes.func,
  onSubmit: propTypes.func,
  setSort: propTypes.func,
  nextPage: propTypes.func,
  prevPage: propTypes.func,
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
};

export default Items;
