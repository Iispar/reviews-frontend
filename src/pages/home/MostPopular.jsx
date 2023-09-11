import React from 'react';
import propTypes from 'prop-types';
import ItemList from '../../components/ItemList';
import SmallItem from '../../components/SmallItem';

/**
 * Creates the most popular conmponent used on the home screen
 * @property {JSON} items - json object containing the items.
 * @property {String} className - Custom className if wanted. Default is mostPopular.
 * @property {String} id - Custom id if wanted. Default is mostPopular.
 * @returns most popular component
 */
const MostPopular = ({ className, id, items }) => (
  <div className={`${className}`}>
    <div className={`${className}__header`} id={`${id}__header`}>
      <span className={`${className}__header__text`}>popular items</span>
    </div>
    { items.length > 0 ? (
      <div className={`${className}__list`} id={`${id}__list`}>
        <ItemList items={items} View={SmallItem} className={`${className}__list__items`} />
      </div>
    ) : (
      <div className={`${className}__empty`}> no items</div>
    )}
  </div>
);

MostPopular.propTypes = {
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
};

MostPopular.defaultProps = {
  items: [],
  className: 'mostPopular',
  id: 'mostPopular',
};

export default MostPopular;
