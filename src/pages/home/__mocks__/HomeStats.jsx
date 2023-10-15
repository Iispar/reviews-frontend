/* eslint-disable no-unused-vars */
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
  for (let i = 0; i < barChartData.length; i += 1) {
    barChart.push(
      <div key={i}>
        {barChartData[i].count}
        count
        <br />
        {barChartData[i].rating}
        rating
      </div>,
    );
  }
  return (
    <div>
      <div>
        <div>
          {barChartData.length > 0 ? (
            <div>
              barChart:
              { barChart }
            </div>
          ) : (
            <div className={`${className}__ratings__empty`}>  no data </div>
          )}
        </div>
        <div> distribution of ratings </div>
      </div>
      <div>
        <div>
          <div>
            {itemCount}
            items
          </div>
          <div>
            {reviewCount}
            reviews
          </div>
          <div>
            {ratingAvg}
            avg rating
          </div>
        </div>
        <div> alltime </div>
      </div>
    </div>
  );
};

export default HomeStats;
