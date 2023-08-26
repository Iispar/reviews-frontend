import React from 'react';
import propTypes from 'prop-types';

/**
 * Tooltip for the line chart with two values.
 * Displays the values as reviews as ratings. This is currently fixed because it is the
 * only one needed for the app.
 * @property {json} payload - Contains the time, reviews count and rating value.
 * @property {boolean} active - if active
 * @property {string} className - Custom className if wanted. Default lineTooltip.
 * @property {string} id - Custom id if wanted. Default lineTooltip.
 * @returns line chart tooltip
 */
const LineTooltip = (props) => {
  const { payload } = props;
  const { active } = props;
  const { className } = props;
  const { id } = props;
  if (active && payload && payload.length && payload[0].payload.time !== undefined) {
    const { time } = payload[0].payload;
    const { count } = payload[0].payload;
    const { rating } = payload[0].payload;
    const { year } = payload[0].payload;

    // check if time is month or week
    const title = /^\d+$/.test(time) ? `week ${time} of ${year}` : `${time} of ${year}`;

    return (
      <div className={className}>
        <span className={`${className}__title`} id={`${id}__title`}>
          {title}
        </span>
        <div className={`${className}__countReviews`} id={`${id}__countReviews`}>
          <span className={`${className}__countReviews__count`} id={`${id}__countReviews__count`}>
            {count}
          </span>
          {' '}
          reviews with
        </div>
        <div className={`${className}__countRating`} id={`${id}__countRating`}>
          average rating
          {' '}
          <span className={`${className}__countRating__count`} id={`${id}__countRating__count`}>
            {rating}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

LineTooltip.propTypes = {
  payload: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  active: propTypes.bool,
  className: propTypes.string,
  id: propTypes.string,
};

LineTooltip.defaultProps = {
  payload: null,
  active: null,
  className: 'lineTooltip',
  id: 'lineTooltip',
};

export default LineTooltip;
