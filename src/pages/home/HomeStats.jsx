import React from 'react';
import propTypes from 'prop-types';
import BarChart from '../../components/BarChart';

/**
 * Renders the stats component used in the home screen.
 * @property {String} className - custom className if wanted. Default homeStats.
 * @property {String} id - custom id if wanted. Default homeStats.
 * @returns stats component
 */
const HomeStats = (props) => {
  const { barChartData } = props;
  const { itemCount } = props;
  const { ratingAvg } = props;
  const { reviewCount } = props;
  const { className } = props;
  const { id } = props;
  return (
    <div className={className}>
      <div className={`${className}__ratings`}>
        <div className={`${className}__ratings__chart`} id={`${id}__ratings__chart`}>
          <BarChart data={barChartData} />
        </div>
        <div className={`${className}__ratings__label`}> distribution of ratings </div>
      </div>
      <div className={`${className}__allTime`} id={`${id}__allTime`}>
        <div className={`${className}__allTime__stats`}>
          <div className={`${className}__allTime__stats__items`}>
            <span className={`${className}__allTime__stats__items__value`}>
              {' '}
              {itemCount}
              {' '}
            </span>
            <span className={`${className}__allTime__stats__items__label`}> items </span>
          </div>
          <div className={`${className}__allTime__stats__reviews`}>
            <span className={`${className}__allTime__stats__reviews__value`}>
              {' '}
              {reviewCount}
              {' '}
            </span>
            <span className={`${className}__allTime__stats__reviews__label`}> reviews </span>
          </div>
          <div className={`${className}__allTime__stats__ratings`}>
            <span className={`${className}__allTime__stats__ratings__value`}>
              {' '}
              {ratingAvg}
              {' '}
            </span>
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
  barChartData: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  itemCount: propTypes.number,
  reviewCount: propTypes.number,
  ratingAvg: propTypes.number,
};

HomeStats.defaultProps = {
  className: 'homeStats',
  id: 'homeStats',
  barChartData: null,
  itemCount: null,
  reviewCount: null,
  ratingAvg: null,
};

export default HomeStats;
