import React from 'react';
import Pagination from '../../components/Pagination';
import ItemList from '../../components/ItemList';
import LargeItem from '../../components/LargeItem';
import dummyItems from '../../data/dummyItems.json';

// eslint-disable-next-line arrow-body-style
const Items = () => {
  const { items } = dummyItems;
  return (
    <div className="itemList">
      <div className="itemList__header">
        <span> sort </span>
      </div>
      <div className="itemList__list">
        <ItemList items={items} View={LargeItem} />
      </div>
      <div className="itemList__pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default Items;
