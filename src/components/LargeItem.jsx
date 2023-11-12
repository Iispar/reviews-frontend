import React from 'react';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

/**
 * Renders a item in the large format.
 * @property {string} id - Custom id if wanted. Default is default.
 * @property {string} className - Custom className if wanted. Default is largeField.
 * @property {string} item - Name of the item.
 * @property {string} reviews - Count of the reviews.
 * @property {string} rating - Value of the rating.
 * @returns large item
 */
const LargeItem = ({
  id, item, reviews, rating, className,
}) => {
  const navigate = useNavigate();

  return (
    <div className={className} id={`${className}__${id}`} onClick={() => navigate(`/item/${id}`)} role="presentation">
      <div className={`${className}__nameReviews`}>
        <span className={`${className}__nameReviews__name`} id={`${className}__nameReviews__name`}>
          {item}
        </span>
        <div className={`${className}__nameReviews__reviews`}>
          <span className={`${className}__nameReviews__reviews__count`} id={`${className}__nameReviews__reviews__count`}>
            {reviews}
          </span>
          <span className={`${className}__nameReviews__reviews__label`}>
            reviews
          </span>
        </div>
      </div>
      <div className={`${className}__rating`}>
        <span className={`${className}__rating__rate`} id={`${className}__rating__rate`}>
          {rating}
        </span>
        <div className={`${className}__rating__star`} />
      </div>
    </div>
  );
};

LargeItem.propTypes = {
  item: propTypes.string,
  className: propTypes.string,
  rating: propTypes.number,
  id: propTypes.number,
  reviews: propTypes.string,
};

LargeItem.defaultProps = {
  item: null,
  className: 'largeItem',
  rating: null,
  id: 2,
  reviews: null,
};

export default LargeItem;
