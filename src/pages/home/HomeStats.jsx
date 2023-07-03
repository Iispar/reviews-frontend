import React from 'react';
import propTypes from 'prop-types';
import BarChart from '../../components/BarChart';
import dummy from '../../data/dummyData/dummyReviewDis.json';

/**
 * Renders the stats component used in the home screen.
 * @property {String} className - custom className if wanted. Default homeStats.
 * @property {String} id - custom id if wanted. Default homeStats.
 * @returns stats component
 */
const HomeStats = (props) => {
  const { className } = props;
  const { id } = props;
  return (
    <div className={className}>
      <div className={`${className}__ratings`}>
        <div className={`${className}__ratings__chart`} id={`${id}__ratings__chart`}>
          <BarChart data={dummy.data} />
        </div>
        <div className={`${className}__ratings__label`}> distribution of ratings </div>
      </div>
      <div className={`${className}__allTime`} id={`${id}__allTime`}>
        <div className={`${className}__allTime__stats`}>
          <div className={`${className}__allTime__stats__items`}>
            <span className={`${className}__allTime__stats__items__value`}> 21 </span>
            <span className={`${className}__allTime__stats__items__label`}> items </span>
          </div>
          <div className={`${className}__allTime__stats__reviews`}>
            <span className={`${className}__allTime__stats__reviews__value`}> 320 </span>
            <span className={`${className}__allTime__stats__reviews__label`}> reviews </span>
          </div>
          <div className={`${className}__allTime__stats__ratings`}>
            <span className={`${className}__allTime__stats__ratings__value`}> 3.2 </span>
            <span className={`${className}__allTime__stats__ratings__label`}> avg rating </span>
          </div>
        </div>
        <div className={`${className}__allTime__title`} id={`${id}__allTime__title`}> all time</div>
      </div>
    </div>
  );
};

HomeStats.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

HomeStats.defaultProps = {
  className: 'homeStats',
  id: 'homeStats',
};

export default HomeStats;
