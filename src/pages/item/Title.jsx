import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the title element for single item
 * @property {String} name - Name of the item.
 * @property {String} desc - Description of the item.
 * @property {String} reviewsCount - Number of reviews for the item.
 * @property {String} ratingValue - Rating of the item.
 * @property {String} posReviews - Number of positive reviews for the item.
 * @property {String} negReviews - Number of negative reviews for the item.
 * @property {String} className - Custom className if wanted. Default is itemTitle.
 * @property {String} id - Custom id if wanted. Default is itemTitle.
 * @returns title for single item
 */
const Title = ({
  name, reviewsCount, ratingValue, posReviews, negReviews, className, id,
}) => {
  if (name == null) return null;
  /**
   * Formats the star rating to actual stars.
   * @param {String} reviews
   *        the star rating as a string.
   * @returns stars for the reviews title component
   */
  const ratingToStars = (reviews) => {
    const split = reviews.split('.');
    const stars = parseInt(split[0], 10);
    const left = stars * 24 + stars * 2 + (2.4 * parseInt(split[1], 10));
    const list = [];
    const width = 2.4 * (11 - parseInt(split[1], 10));
    // if only zero point some stars we need to draw this alone because the loop wont work...
    if (stars === 0) {
      list.push(<div className="star" key="singularStar" />);
      list.push(<div className="star__cutout" key="singularCutout" style={{ left: `${left}px`, width: `${width}px` }} />);
    }

    for (let i = 0; i < stars; i += 1) {
      // rename the keys to something better than the index.
      list.push(<div className="star" key={i} />);
      if (i === stars - 1 && parseInt(split[1], 10) !== 0) {
        list.push(<div className="star" key="final" />);
        list.push(<div className="star__cutout" key="cutout" style={{ left: `${left}px`, width: `${width}px` }} />);
      }
    }
    return (
      <div className={`${className}__data__rating__stars`}>
        {list}
      </div>
    );
  };

  return (
    <div className={`${className}`} id={`${id}`}>
      <div className={`${className}__info`}>
        <div className={`${className}__info__name`} id={`${className}__info__name`}>
          {name}
        </div>
      </div>
      <div className={`${className}__data`}>
        <div className={`${className}__data__reviews`} id={`${className}__data__reviews`}>
          <span className={`${className}__data__reviews__value`}>
            {reviewsCount}
          </span>
          reviews
        </div>
        <div className={`${className}__data__rating`} id={`${className}__data__rating`}>
          <span className={`${className}__data__rating__value`}>
            {ratingToStars(ratingValue)}
          </span>
          rating
        </div>
        <div className={`${className}__data__positive`} id={`${className}__data__positive`}>
          <span className={`${className}__data__positive__value`}>
            {posReviews}
          </span>
          positive
        </div>
        <div className={`${className}__data__negative`} id={`${className}__data__negative`}>
          <span className={`${className}__data__negative__value`}>
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
  reviewsCount: propTypes.string,
  ratingValue: propTypes.string,
  posReviews: propTypes.string,
  negReviews: propTypes.string,
  className: propTypes.string,
  id: propTypes.string,
};

Title.defaultProps = {
  name: null,
  reviewsCount: null,
  ratingValue: null,
  posReviews: null,
  negReviews: null,
  className: 'itemTitle',
  id: 'itemTitle',
};

export default Title;
