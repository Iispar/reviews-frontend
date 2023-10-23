/* eslint-disable react/prop-types */
import React from 'react';

const DoubleLineChart = ({ data }) => {
  if (data == null) return null;

  const dataList = [];
  for (let i = 0; i < data.length; i += 1) {
    dataList.push(
      <div key={i}>
        {data[i].count}
        <br />
        {data[i].time}
        <br />
        {data[i].timeYear}
        <br />
        {data[i].rating}
        <br />
      </div>,
    );
  }
  return (
    <div id="mockChart">
      {dataList}
    </div>
  );
};

export default DoubleLineChart;
