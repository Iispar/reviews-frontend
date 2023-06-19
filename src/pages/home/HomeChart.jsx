import React from 'react';
import dummy from '../../data/dummyData/dummyHome.json';
import DoubleLineChart from '../../components/DoubleLineChart';

/**
 * Renders the chart for the home page.
 * @returns the home chart
 */
// eslint-disable-next-line arrow-body-style
const HomeChart = () => {
  return (
    <div className="homeChart">
      <DoubleLineChart data={dummy.data} />
    </div>
  );
};

export default HomeChart;
