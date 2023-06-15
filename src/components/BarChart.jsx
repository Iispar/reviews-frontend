/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import propTypes from 'prop-types';

const Chart = (props) => {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

Chart.propTypes = {
  // fix proptype
  // eslint-disable-next-line react/forbid-prop-types
  data: propTypes.arrayOf(propTypes.object),
};

Chart.defaultProps = {
  data: null,

};

export default Chart;
