/* eslint-disable react/prop-types */
import React from 'react';
import SkeletonLoad from '../../../components/SkeletonLoad';

const HomeStats = ({
  barChartData, itemCount, ratingAvg, reviewCount, className, id,
}) => {
  if (barChartData == null || itemCount == null) {
    return (
      <div className={className}>
        <div className={`${className}__barLoad`}>
          <SkeletonLoad />
        </div>
        <div className={`${className}__statsLoad`}>
          <SkeletonLoad />
        </div>
      </div>
    );
  }
  const barChart = [];
  for (let i = 0; i < barChart.length; i += 1) {
    barChart.push(
      <div>
        {barChart[i].count}
        <br />
        {barChart[i].rating}
      </div>,
    );
  }
  return (
    <div className={className}>
      <div className={`${className}__ratings`}>
        <div className={`${className}__ratings__chart`} id={`${id}__ratings__chart`}>
          {barChartData.length > 0 ? (
            <div>{ barChart }</div>
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
            <span className={`${className}__allTime__stats__items__label`}> items </span>
          </div>
          <div className={`${className}__allTime__stats__reviews`}>
            <span className={`${className}__allTime__stats__reviews__value`}>
              {reviewCount}
            </span>
            <span className={`${className}__allTime__stats__reviews__label`}> reviews </span>
          </div>
          <div className={`${className}__allTime__stats__ratings`}>
            <span className={`${className}__allTime__stats__ratings__value`}>
              {ratingAvg}
            </span>
            <span className={`${className}__allTime__stats__ratings__label`}> avg rating </span>
          </div>
        </div>
        <div className={`${className}__allTime__title`} id={`${id}__allTime__title`}> all time</div>
      </div>
    </div>
  );
};

export default HomeStats;
