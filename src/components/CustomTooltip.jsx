import React from 'react';
import propTypes from 'prop-types';

const CustomTooltip = (props) => {
  const { payload } = props;
  const { active } = props;
  if (active && payload && payload.length) {
    const { title } = payload[0].payload;
    const { count } = payload[0].payload;
    return (
      <div className="customTooltip">
        <span className="customTooltip__count">{`${count} ratings`}</span>
        <span className="customTooltip__title">{`of ${title}`}</span>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  payload: propTypes.string,
  active: propTypes.string,
};

CustomTooltip.defaultProps = {
  payload: null,
  active: null,
};

export default CustomTooltip;
