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

  const ratingToStars = (reviews) => {
    const split = reviews.split('.');
    const stars = parseInt(split[0], 10);
    const left = stars * 24 + stars * 2 + (2.4 * parseInt(split[1], 10));
    const list = [];
    const width = 2.4 * (11 - parseInt(split[1], 10));
    // if only zero point some stars we need to draw this alone because the loop wont work...
    if (stars === 0) {
      list.push(<div className="star" />);
      list.push(<div className="star__cutout" style={{ left: `${left}px`, width: `${width}px` }} />);
    }

    for (let i = 0; i < stars; i += 1) {
      list.push(<div className="star" />);
      if (i === stars - 1 && parseInt(split[1], 10) !== 0) {
        list.push(<div className="star" />);
        list.push(<div className="star__cutout" style={{ left: `${left}px`, width: `${width}px` }} />);
      }
    }
    return (
      <div className="itemTitle__data__rating__stars">
        {list}
      </div>
    );
  };

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
          <span className="itemTitle__data__reviews__value">
            {reviewsCount}
          </span>
          reviews
        </div>
        <div className="itemTitle__data__rating">
          <span className="itemTitle__data__rating__value">
            {ratingToStars(ratingValue)}
          </span>
          rating
        </div>
        <div className="itemTitle__data__positive">
          <span className="itemTitle__data__positive__value">
            {posReviews}
          </span>
          positive
        </div>
        <div className="itemTitle__data__negative">
          <span className="itemTitle__data__negative__value">
            {negReviews}
          </span>
          negative
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
