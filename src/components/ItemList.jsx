import React from 'react';
import propTypes from 'prop-types';

/**
 * Creates a list of either SmallItem or LargeItem.
 * @property {json} items - json of the items includes
 * item name, rating, reviews (if large) and key.
 * @property {String} View - The Component used for the list either SmallItem or LargeItem.
 * @property {String} className - Custom classname if wanted. Default is itemList.
 * @property {String} id - Custom id if wanted. Default is itemList.
 * @returns list of SmallItems or LargeItems
 */
const ItemList = ({
  items, View, className, id,
}) => {
  const productList = [];
  for (let i = 0; i < items.length; i += 1) {
    // with the if else I can use this compoment to create all lists of items. It is a bit clumsy
    // because the different components need different values so.
    // TODO: make better.
    if (View === 'Smallitem') {
      productList.push(
        <View
          item={items[i].title}
          rating={items[i].rating}
          key={items[i].id}
          id={items[i].id}
        />,
      );
    } else {
      productList.push(
        <View
          item={items[i].title}
          rating={items[i].rating}
          reviews={items[i].reviews}
          key={items[i].id}
          id={items[i].id}
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
  className: propTypes.string,
  id: propTypes.string,
};

ItemList.defaultProps = {
  items: [],
  View: null,
  className: 'itemList',
  id: 'itemList',
};

export default ItemList;
