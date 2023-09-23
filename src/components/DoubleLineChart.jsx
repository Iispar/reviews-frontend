import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import propTypes from 'prop-types';
import LineChartTooltip from './LineTooltip';
import { useVerticalPoints } from '../helpers/componentHelpers';

/**
 * Renders a line chart with two lines
 * As this is used in this app only for reviews and ratings the right domain is 1-6
 * and left is until max reviews.
 * uses the recharts library.
 * @property {json} data - Data with count and ratings as keys. Used for the lines.
 * @property {String} className - Custom className if wanted. Default lineChart.
 * @property {String} id - Custom id if wanted. Default lineChart.
 * @returns line chart
 */
const DoubleLineChart = ({ data, className, id }) => {
  if (data == null) return null;

  // calculate max value for reviews count to get max height of charts count axis.
  const reviews = data.map((object) => object.count);
  const max = Math.max(...reviews) + 10;
  // calculate vertical points for the background grid
  const verticalPoints = useVerticalPoints(reviews.length - 2);
  // set width regarding if there is 3, 5, 7, 9 or 11 values.
  let yWidth = 0;
  switch (reviews.length) {
    case (5): yWidth = -130; break;
    case (7): yWidth = -80; break;
    case (9): yWidth = -60; break;
    case (11): yWidth = -48; break;
    default: yWidth = 0;
  }

  return (
    <ResponsiveContainer width="100%" height="100%" className={className} id={id}>
      <LineChart
        width={0}
        height={0}
        data={data}
        id={`${id}__chart`}
        margin={{
          top: 0,
          bottom: -44,
          right: 0,
          left: 0,
        }}
      >
        <CartesianGrid horizontal={false} verticalPoints={verticalPoints} />
        <XAxis dataKey="time" height={1} fontFamily="mainFont" tickSize axisLine={false} dy={-24} />
        <YAxis yAxisId="left" width={yWidth} tick={false} domain={[-4, max]} />
        <YAxis yAxisId="right" tick={false} orientation="right" domain={[0, 7]} width={yWidth} />
        <Tooltip cursor={false} content={<LineChartTooltip />} />
        <Legend layout="vertical" wrapperStyle={{ top: 0, left: 5, fontFamily: 'mainFont' }} />
        <Line yAxisId="left" type="monotone" dataKey="count" stroke="#4F5D75" />
        <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#EF8354" />
      </LineChart>
    </ResponsiveContainer>
  );
};

DoubleLineChart.propTypes = {
  data: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
};

DoubleLineChart.defaultProps = {
  data: null,
  className: 'lineChart',
  id: 'lineChart',

};

export default DoubleLineChart;
