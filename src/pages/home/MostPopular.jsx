import React from 'react';
import ItemList from '../../components/ItemList';
import dummyItems from '../../data/dummyItems.json';

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
        <ItemList items={items} />
      </div>
    </div>
  );
};

export default MostPopular;
