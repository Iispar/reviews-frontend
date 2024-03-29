import React from 'react';
import propTypes from 'prop-types';
import BarChart from '../../components/BarChart';
import SkeletonLoad from '../../components/SkeletonLoad';

/**
 * Renders the stats component used in the home screen.
 * @property {json} barChartData - The data used for barChart.
 * @property {Integer} itemCount - Count of items for account
 * @property {Double} ratingAvg - Average rating of items for account.
 * @property {Integer} reviewCount - Count of reviews for account.
 * @property {String} className - custom className if wanted. Default homeStats.
 * @property {String} id - custom id if wanted. Default homeStats.
 * @returns stats component
 */
const HomeStats = ({
  barChartData, itemCount, ratingAvg, reviewCount, className, id,
}) => {
  if (barChartData == null || itemCount == null) {
    return (
      <div className={className} id={id}>
        <div className={`${className}__barLoad`} id={`${id}__barLoad`}>
          <SkeletonLoad />
        </div>
        <div className={`${className}__statsLoad`} id={`${id}__statsLoad`}>
          <SkeletonLoad />
        </div>
      </div>
    );
  }
  return (
    <div className={className} id={id}>
      <div className={`${className}__ratings`}>
        <div className={`${className}__ratings__chart`} id={`${id}__ratings__chart`}>
          {barChartData.length > 0 ? (
            <BarChart data={barChartData} />
          ) : (
            <div className={`${className}__ratings__empty`}>  no data </div>
          )}
        </div>
        <div className={`${className}__ratings__label`}> distribution of ratings </div>
      </div>
      <div className={`${className}__allTime`} id={`${id}__allTime`}>
        <div className={`${className}__allTime__stats`}>
          <div className={`${className}__allTime__stats__items`}>
            <span className={`${className}__allTime__stats__items__value`}>
              {itemCount}
            </span>
            items
          </div>
          <div className={`${className}__allTime__stats__reviews`}>
            <span className={`${className}__allTime__stats__reviews__value`}>
              {reviewCount}
            </span>
            reviews
          </div>
          <div className={`${className}__allTime__stats__ratings`}>
            <span className={`${className}__allTime__stats__ratings__value`}>
              {ratingAvg}
            </span>
            avg rating
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
