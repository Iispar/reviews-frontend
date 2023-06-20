import React from 'react';
import propTypes from 'prop-types';

/**
 * Tooltip for the bar chart.
 * @param {*} props
 * @returns tooltip for barchart
 */
const BarTooltip = (props) => {
  const { payload } = props;
  const { active } = props;
  if (active && payload && payload.length) {
    const { title } = payload[0].payload;
    const { count } = payload[0].payload;
    return (
      <div className="barTooltip">
        <span className="barTooltip__count">{`${count} ratings`}</span>
        <span className="barTooltip__title">{`with ${title}`}</span>
      </div>
    );
  }
  return null;
};

BarTooltip.propTypes = {
  payload: propTypes.arrayOf(propTypes.objectOf(propTypes.object)),
  active: propTypes.bool,
};

BarTooltip.defaultProps = {
  payload: null,
  active: null,
};

export default BarTooltip;
