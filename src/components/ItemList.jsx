import React from 'react';
import propTypes from 'prop-types';

/**
 * Creates a list of smallItems. Used in home at most popular.
 * @returns list of smallItems
 */
const ItemList = (props) => {
  const { items } = props;
  const { View } = props;
  const { count } = props;
  const productList = [];
  for (let i = 0; i < count; i += 1) {
    if (View === 'Smallitem') {
      productList.push(
        <View
          item={items[i].item}
          rating={items[i].rating}
          key={items[i].key}
          id={items[i].key}
        />,
      );
    } else {
      productList.push(
        <View
          item={items[i].item}
          rating={items[i].rating}
          reviews={items[i].reviews}
          key={items[i].key}
          id={items[i].key}
        />,
      );
    }
  }
  return (
    <div className="itemList" id="itemList">{productList}</div>
  );
};

ItemList.propTypes = {
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  View: propTypes.func,
  count: propTypes.number,
};

ItemList.defaultProps = {
  items: null,
  View: null,
  count: 5,
};

export default ItemList;
