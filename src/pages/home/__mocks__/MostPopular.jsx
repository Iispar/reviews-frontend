/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import SkeletonLoad from '../../../components/SkeletonLoad';

const MostPopular = ({ className, id, items }) => {
  const itemList = [];
  if (items == null) {
    return (
      <SkeletonLoad />
    );
  }
  for (let i = 0; i < items.length; i += 1) {
    itemList.push(
      <div key={items[i].id}>
        {items[i].title}
        <br />
        {items[i].accountId}
        <br />
        {items[i].rating}
        <br />
      </div>,
    );
  }
  return (
    <div id="testItems">
      <div>
        <span>popular items</span>
      </div>
      { items.length > 0 ? (
        <div id="testItems__list">
          {itemList}
        </div>
      ) : (
        <div> no items</div>
      )}
    </div>
  );
};

export default MostPopular;
