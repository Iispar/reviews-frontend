import React from 'react';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTextWidth } from '../helpers/componentHelpers';

/**
 * Displays a singular item as small.
 * @property {string} item - Name of the item.
 * @property {rating} rating - Rating value of the item.
 * @property {id} id - Custom id if wanted. Default is default.
 * @property {className} className - Custom className if wanted. Default is smallitem.
 * @returns item in small format.
 */
const SmallItem = ({
  item, rating, id, className,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={className}
      id={`smallItem__${id}`}
      onClick={() => navigate(`/item/${id}`)}
      role="presentation"
    >
      <div className={`${className}__name`}>
        <span
          className={
            item.length > 22
              ? `${className}__name__text__hover`
              : `${className}__name__text`
          }
          id={`smallItem__name__text__${id}`}
          style={
            item.length > 22
              ? {
                transition: `all ${
                  useTextWidth(item, '16px mulish') / 180
                }s linear`,
              }
              : { transition: 'none' }
          }
        >
          {item}
        </span>
      </div>
      <div className={`${className}__rating`}>
        <span
          className={`${className}__rating__value`}
          id={`smallItem__rating__value__${id}`}
        >
          {rating.toFixed(1)}
        </span>
        <div className={`${className}__rating__icon`} />
      </div>
    </div>
  );
};

SmallItem.propTypes = {
  item: propTypes.string,
  rating: propTypes.number,
  id: propTypes.number,
  className: propTypes.string,
};

SmallItem.defaultProps = {
  item: null,
  rating: null,
  id: 'default',
  className: 'smallItem',
};

export default SmallItem;
