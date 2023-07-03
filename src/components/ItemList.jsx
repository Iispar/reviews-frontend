import React from 'react';
import propTypes from 'prop-types';

/**
 * Creates a list of either SmallItem or LargeItem.
 * @property {json} items - json of the items includes
 * item name, rating, reviews (if large) and key.
 * @property {String} View - The Component used for the list either SmallItem or LargeItem.
 * @property {Integer} count - Number of reviews in items json.
 * @returns list of SmallItems or LargeItems
 */
const ItemList = (props) => {
  const { items } = props;
  const { View } = props;
  const { count } = props;
  const { className } = props;
  const { id } = props;

  const productList = [];
  for (let i = 0; i < count; i += 1) {
    // with the if else I can use this compoment to create all lists of items. It is a bit clumsy
    // because the different components need different values so.
    // TODO: make better.
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
    <div className={className} id={id}>
      {productList}
    </div>
  );
};

ItemList.propTypes = {
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  View: propTypes.func,
  count: propTypes.number,
  className: propTypes.string,
  id: propTypes.string,
};

ItemList.defaultProps = {
  items: null,
  View: null,
  count: 5,
  className: 'itemList',
  id: 'itemList',
};

export default ItemList;
