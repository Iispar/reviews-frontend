/* eslint-disable react/prop-types */
import React from 'react';

const Chart = ({
  data,
}) => {
  const mockData = [];
  for (let i = 0; i < data.length; i += 1) {
    mockData.push(
      <div key={i}>
        {data[i].count}
        <br />
        {data[i].rating}
      </div>,
    );
  }
  return (
    <div id="mockChart">
      {mockData}
    </div>
  );
};

export default Chart;
