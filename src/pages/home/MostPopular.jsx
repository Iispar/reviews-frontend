import React from 'react';
import ItemList from '../../components/ItemList';
import dummyItems from '../../data/dummyItems.json';
import SmallItem from '../../components/SmallItem';

/**
 * Creates the most popular content on the home ecreen
 * @returns most popular list
 */
const MostPopular = () => {
  const { items } = dummyItems;
  return (
    <div className="mostPopular">
      <div className="mostPopular__header">
        <span className="mostPopular__header__text">popular items</span>
      </div>
      <div className="mostPopular__list">
        <ItemList items={items} View={SmallItem} count={5} />
      </div>
    </div>
  );
};

export default MostPopular;
