import React from 'react';
import propTypes from 'prop-types';
import ItemList from '../../components/ItemList';
import SmallItem from '../../components/SmallItem';

/**
 * Creates the most popular content on the home ecreen
 * @returns most popular list
 */
const MostPopular = (props) => {
  const { items } = props;
  return (
    <div className="mostPopular">
      <div className="mostPopular__header" id="mostPopular__header">
        <span className="mostPopular__header__text">popular items</span>
      </div>
      <div className="mostPopular__list" id="mostPopular__list">
        <ItemList items={items} View={SmallItem} count={5} />
      </div>
    </div>
  );
};

MostPopular.propTypes = {
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

MostPopular.defaultProps = {
  items: null,
};

export default MostPopular;
