import React from 'react';
import propTypes from 'prop-types';

/**
 * Displays a singular item as small.
 * @returns item in small format.
 */
const SmallItem = (props) => {
  const { item } = props;
  const { position } = props;
  return (
    <div className="smallItem">
      <span className="smallItem__rank">{position}</span>
      <span className="smallItem__name">{item}</span>
    </div>
  );
};

SmallItem.propTypes = {
  item: propTypes.string,
  position: propTypes.number,
};

SmallItem.defaultProps = {
  item: null,
  position: null,
};

export default SmallItem;
