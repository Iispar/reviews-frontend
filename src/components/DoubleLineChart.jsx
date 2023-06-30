/* eslint-disable no-unused-vars */
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import propTypes from 'prop-types';
import LineChartTooltip from './LineTooltip';
import { getVerticalPoints } from './helpers';

/**
 * Renders a line chart with two lines
 * As this is used in this app only for reviews and ratings the right domain is 1-6 on setting
 * and left is until max reviews.
 * uses the recharts library.
 * @param {json} data
 *        data with reviews and ratings as keys. These are the keys used for the lines...
 * @returns line chart
 */
const DoubleLineChart = (props) => {
  const { data } = props;
  // calculate max value for reviews count to get max of chart
  const reviews = data.map((object) => object.reviews);
  const max = Math.max(...reviews) + 10;
  // calculate vertical points for the background grid
  const verticalPoints = getVerticalPoints(reviews.length - 2);
  // if there are three dots the width is larger...
  const yWidth = reviews.length === 5 ? -120 : -80;

  return (
    <div className="lineChart" id="lineChart">
      <ResponsiveContainer width="100%" height="100%" className="lineChart__chart">
        <LineChart
          width={0}
          height={0}
          data={data}
          margin={{
            top: 0,
            bottom: -44,
            right: 0,
            left: 0,
          }}
        >
          <CartesianGrid horizontal={false} verticalPoints={verticalPoints} />
          <XAxis dataKey="time" height={1} fontFamily="mainFont" tickSize axisLine={false} dy={-24} />
          <YAxis yAxisId="left" width={yWidth} tick={false} domain={[0, max]} />
          <YAxis yAxisId="right" tick={false} orientation="right" domain={[1, 6]} width={yWidth} />
          <Tooltip cursor={false} content={<LineChartTooltip />} />
          <Legend layout="vertical" wrapperStyle={{ top: 0, left: 5, fontFamily: 'mainFont' }} />
          <Line yAxisId="left" type="monotone" dataKey="reviews" stroke="#4F5D75" />
          <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#EF8354" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

DoubleLineChart.propTypes = {
  data: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

DoubleLineChart.defaultProps = {
  data: null,

};

export default DoubleLineChart;
