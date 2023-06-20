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
 * @param {*} props
 * @returns line chart
 */
const DoubleLineChart = (props) => {
  const { data } = props;
  const reviews = data.map((object) => object.reviews);
  const max = Math.max(...reviews) + 10;
  const verticalPoints = getVerticalPoints(reviews.length - 2);

  return (
    <div className="lineChart">
      <ResponsiveContainer width="100%" height="100%" className="lineChart__chart">
        <LineChart
          width={0}
          height={0}
          data={data}
          margin={{
            top: 0,
            bottom: -38,
            right: 0,
            left: 0,
          }}
        >
          <CartesianGrid horizontal={false} verticalPoints={verticalPoints} />
          <XAxis dataKey="month" height={1} fontFamily="mainFont" tickSize axisLine={false} dy={-24} />
          <YAxis yAxisId="left" width={-80} tick={false} domain={[0, max]} />
          <YAxis yAxisId="right" tick={false} orientation="right" domain={[1, 6]} width={-80} />
          <Tooltip cursor={false} content={<LineChartTooltip />} />
          <Legend layout="vertical" wrapperStyle={{ top: 0, left: 5, fontFamily: 'mainFont' }} />
          <Line yAxisId="left" type="monotone" dataKey="reviews" stroke="#8884d8" />
          <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#EF8354" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

DoubleLineChart.propTypes = {
  // fix proptype
  // eslint-disable-next-line react/forbid-prop-types
  data: propTypes.arrayOf(propTypes.object),
};

DoubleLineChart.defaultProps = {
  data: null,

};

export default DoubleLineChart;
