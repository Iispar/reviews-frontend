import React from 'react';
import propTypes from 'prop-types';

/**
 * Creates a list of smallItems. Used in home at most popular.
 * @returns list of smallItems
 */
const ItemList = (props) => {
  const { items } = props;
  const { View } = props;
  const productList = [];
  for (let i = 0; i < items.length; i += 1) {
    productList.push(
      <View
        item={items[i].item}
        rating={items[i].rating}
        key={items[i].key}
        id={items[i].key}
      />,
    );
  }
  return (
    <div className="itemList">{productList}</div>
  );
};

ItemList.propTypes = {
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  View: propTypes.string,
};

ItemList.defaultProps = {
  items: null,
  View: null,
};

export default ItemList;
