/* eslint-disable no-unused-vars */
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import dummy from '../../data/dummyData/dummyHome.json';

// eslint-disable-next-line arrow-body-style
const HomeChart = () => {
  return (
    <div className="homeChart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={300}
          height={200}
          data={dummy.data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="reviews" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="rating" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HomeChart;
