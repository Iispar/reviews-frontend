/* eslint-disable react/prop-types */
import React from 'react';
import SkeletonLoad from '../../../components/SkeletonLoad';

const MostPopular = ({ className, id, items }) => {
  const itemList = [];

  for (let i = 0; i < items.length; i += 1) {
    itemList.push(
      <div>
        {items[0]}
      </div>,
    );
  }
  if (items == null) {
    return (
      <SkeletonLoad />
    );
  }
  return (
    <div className={`${className}`}>
      <div className={`${className}__header`} id={`${id}__header`}>
        <span className={`${className}__header__text`}>popular items</span>
      </div>
      { items.length > 0 ? (
        <div className={`${className}__list`} id={`${id}__list`}>
          {itemList}
        </div>
      ) : (
        <div className={`${className}__empty`}> no items</div>
      )}
    </div>
  );
};

export default MostPopular;
