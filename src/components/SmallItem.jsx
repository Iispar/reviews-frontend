import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

/**
 * Displays a singular item as small.
 * @property {string} item - Name of the item.
 * @property {rating} rating - Rating value of the item.
 * @property {id} id - Custom id if wanted. Default is default.
 * @property {className} className - Custom className if wanted. Default is smallitem.
 * @returns item in small format.
 */
const SmallItem = (props) => {
  const navigate = useNavigate();
  const { item } = props;
  const { rating } = props;
  const { id } = props;
  const { className } = props;

  /**
   * Wait for page to render to set listeners,
  */
  $(document).ready(() => {
    // if name is over 22 digits long add the scroll feature on hover
    if (item.length > 22) {
      $(`#smallItem__name__text__${id}`).addClass('hover');
    }

    // navigate to items page when clicked.
    $(`#smallItem__${id}`).on('click', () => {
      navigate(`/item/${id}`);
    });
  });

  return (
    <div className={className} id={`smallItem__${id}`}>
      <div className={`${className}__name`}>
        <span className={`${className}__name__text`} id={`smallItem__name__text__${id}`}>{item}</span>
      </div>
      <div className={`${className}__rating`}>
        <span className={`${className}__rating__value`} id={`smallItem__rating__value__${id}`}>{rating}</span>
        <div className={`${className}__rating__icon`} />
      </div>
    </div>
  );
};

SmallItem.propTypes = {
  item: propTypes.string,
  rating: propTypes.string,
  id: propTypes.string,
  className: propTypes.string,
};

SmallItem.defaultProps = {
  item: null,
  rating: null,
  id: 'default',
  className: 'smallItem',
};

export default SmallItem;
