import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the tooltip (hover) for the bar chart.
 * @property {json} payload - includes the title and count.
 * @property {boolean} active - boolean if active.
 * @property {String} className - Custom classname if wanted. Default barToolTip.
 * @property {String} id - Custom id if wanted. Default barToolTip
 * @returns tooltip for barchart
 */
const BarTooltip = (props) => {
  const { payload } = props;
  const { active } = props;
  const { className } = props;
  const { id } = props;
  if (active && payload && payload.length) {
    const { rating } = payload[0].payload;
    const { count } = payload[0].payload;
    return (
      <div className="barTooltip">
        <span className={`${className}__count`} id={`${id}__count`}>
          {`${count} ratings`}
        </span>
        <span className={`${className}__title`} id={`${id}__title`}>
          {`with ${rating} stars`}
        </span>
      </div>
    );
  }
  return null;
};

BarTooltip.propTypes = {
  payload: propTypes.arrayOf(propTypes.objectOf(propTypes.String)),
  active: propTypes.bool,
  className: propTypes.string,
  id: propTypes.string,
};

BarTooltip.defaultProps = {
  payload: null,
  active: null,
  className: 'barTooltip',
  id: 'barTooltip',
};

export default BarTooltip;
