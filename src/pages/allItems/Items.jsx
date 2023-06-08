import React from 'react';
import Pagination from '../../components/Pagination';
import ItemList from '../../components/ItemList';
import LargeItem from '../../components/LargeItem';
import dummyItems from '../../data/dummyItems.json';
import SearchField from '../../components/SearchField';

// eslint-disable-next-line arrow-body-style
const Items = () => {
  const { items } = dummyItems;
  return (
    <div className="items">
      <div className="items__header">
        <div className="items__header__search">
          <SearchField />
        </div>
        <div className="items__header__sort">
          <span className="items__header__sort__text"> sort </span>
          <div className="items__header__sort__arrow" />
        </div>
      </div>
      <div className="items__list">
        <ItemList items={items} View={LargeItem} count={6} />
      </div>
      <div className="items__pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default Items;
