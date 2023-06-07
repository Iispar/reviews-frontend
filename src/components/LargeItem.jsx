import React from 'react';
import propTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const LargeItem = (props) => {
  // const navigate = useNavigate();
  const { id } = props;
  const { item } = props;
  const { reviews } = props;
  const { rating } = props;
  return (
    <div className="largeItem" id={`largeItem__${id}`}>
      <div className="largeItem__nameReviews">
        <span className="largeItem__name__text">
          {item}
        </span>
        <span className="largeItem__name__reviews">
          {reviews}
        </span>
      </div>
      <div className="largeItem__rating">
        <span className="largeItem__rating__rate">
          {' '}
          {rating}
          {' '}
        </span>
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
