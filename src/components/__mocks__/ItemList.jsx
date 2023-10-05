/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const ItemList = ({
  items, View, className, id,
}) => {
  const productList = [];
  for (let i = 0; i < items.length; i += 1) {
    productList.push(
      <div key={items[i].id}>
        <p>{items[i].title}</p>
        <p>{items[i].rating}</p>
        <p>{items[i].reviews}</p>
        <p>{items[i].id}</p>
      </div>,
    );
  }
  return (
    <div id="itemListMock">
      {productList}
    </div>
  );
};

export default ItemList;
