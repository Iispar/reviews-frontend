import React from 'react';
import propTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const Title = (props) => {
  const { name } = props;
  const { desc } = props;
  const { reviewsCount } = props;
  const { ratingValue } = props;
  const { posReviews } = props;
  const { negReviews } = props;

  return (
    <div className="itemTitle">
      <div className="itemTitle__info">
        <div className="itemTitle__info__name">
          {name}
        </div>
        <div className="itemTitle__info__desc">
          {desc}
        </div>
      </div>
      <div className="itemTitle__data">
        <div className="itemTitle__data__reviews">
          {reviewsCount}
          reviews
        </div>
        <div className="itemTitle__data__rating">
          {ratingValue}
          rating
        </div>
        <div className="itemTitle__data__positive">
          {posReviews}
          pos
        </div>
        <div className="itemTitle__data__negative">
          {negReviews}
          neg
        </div>
      </div>
    </div>
  );
};

Title.propTypes = {
  name: propTypes.string,
  desc: propTypes.string,
  reviewsCount: propTypes.string,
  ratingValue: propTypes.string,
  posReviews: propTypes.string,
  negReviews: propTypes.string,
};

Title.defaultProps = {
  name: null,
  desc: null,
  reviewsCount: null,
  ratingValue: null,
  posReviews: null,
  negReviews: null,
};

export default Title;
