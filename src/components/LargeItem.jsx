import React from 'react';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

// eslint-disable-next-line arrow-body-style
const LargeItem = (props) => {
  const navigate = useNavigate();
  const { id } = props;
  const { item } = props;
  const { reviews } = props;
  const { rating } = props;

  // wait for the page to load before setting listeners
  $(document).ready(() => {
    // navigate to items page when clicked.
    $(`#largeItem__${id}`).on('click', () => {
      navigate(`/item/${id}`);
    });
  });

  return (
    <div className="largeItem" id={`largeItem__${id}`}>
      <div className="largeItem__nameReviews">
        <span className="largeItem__nameReviews__name">
          {item}
        </span>
        <div className="largeItem__nameReviews__reviews">
          <span className="largeItem__nameReviews__reviews__count">
            {reviews}
          </span>
          <span className="largeItem__nameReviews__reviews__label">
            reviews
          </span>
        </div>
      </div>
      <div className="largeItem__rating">
        <span className="largeItem__rating__rate">
          {rating}
        </span>
        <div className="largeItem__rating__star" />
      </div>
    </div>
  );
};

LargeItem.propTypes = {
  item: propTypes.string,
  rating: propTypes.number,
  id: propTypes.string,
  reviews: propTypes.string,
};

LargeItem.defaultProps = {
  item: null,
  rating: null,
  id: null,
  reviews: null,
};

export default LargeItem;
