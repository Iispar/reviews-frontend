import React from 'react';
import propTypes from 'prop-types';

/**
 * Displays a singular item as small.
 * @returns item in small format.
 */
const SmallItem = (props) => {
  const { item } = props;
  const { rating } = props;
  return (
    <div className="smallItem">
      <span className="smallItem__name">{item}</span>
      <div className="smallItem__rating">
        <span className="smallItem__rating__value">{rating}</span>
        <span className="smallItem__rating__icon" />
      </div>
    </div>
  );
};

SmallItem.propTypes = {
  item: propTypes.string,
  rating: propTypes.number,
};

SmallItem.defaultProps = {
  item: null,
  rating: null,
};

export default SmallItem;
