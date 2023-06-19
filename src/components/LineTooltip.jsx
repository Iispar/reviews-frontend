import React from 'react';
import propTypes from 'prop-types';

/**
 * Tooltip for the line chart with two values
 * @param {*} props
 * @returns line chart tooltip
 */
const LineTooltip = (props) => {
  const { payload } = props;
  const { active } = props;
  if (active && payload && payload.length) {
    const { month } = payload[0].payload;
    const { reviews } = payload[0].payload;
    const { rating } = payload[0].payload;
    return (
      <div className="lineTooltip">
        <span className="lineTooltip__title">{`${month}`}</span>
        <div className="lineTooltip__countReviews">
          <span className="lineTooltip__countReviews__count">
            {reviews}
          </span>
          {' '}
          reviews with
        </div>
        <div className="lineTooltip__countRating">
          average rating
          {' '}
          <span className="lineTooltip__countRating__count">
            {rating}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

LineTooltip.propTypes = {
  payload: propTypes.string,
  active: propTypes.string,
};

LineTooltip.defaultProps = {
  payload: null,
  active: null,
};

export default LineTooltip;
