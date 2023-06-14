import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

/**
 * Displays a singular item as small.
 * @returns item in small format.
 */
const SmallItem = (props) => {
  const navigate = useNavigate();
  const { item } = props;
  const { rating } = props;
  const { id } = props;

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
    <div className="smallItem" id={`smallItem__${id}`}>
      <div className="smallItem__name">
        <span className="smallItem__name__text" id={`smallItem__name__text__${id}`}>{item}</span>
      </div>
      <div className="smallItem__rating">
        <span className="smallItem__rating__value" id={`smallItem__rating__value__${id}`}>{rating}</span>
        <span className="smallItem__rating__icon" />
      </div>
    </div>
  );
};

SmallItem.propTypes = {
  item: propTypes.string,
  rating: propTypes.string,
  id: propTypes.string,
};

SmallItem.defaultProps = {
  item: null,
  rating: null,
  id: 'id',
};

export default SmallItem;
