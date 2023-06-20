import React, { useState } from 'react';
import dummy from '../../data/dummyData/dummyHome.json';
import DoubleLineChart from '../../components/DoubleLineChart';

/**
 * Renders the chart for the home page.
 * @returns the home chart
 */
// eslint-disable-next-line arrow-body-style
const HomeChart = () => {
  const [view, setView] = useState(dummy.month);
  return (
    <div className="homeChart">
      <DoubleLineChart data={view} />
      <div className="homeChart__selector">
        <button className="homeChart__selector__year" type="button" onClick={() => setView(dummy.year)}> year </button>
        <button className="homeChart__selector__month" type="button" onClick={() => setView(dummy.month)}> month </button>
        <button className="homeChart__selector__week" type="button" onClick={() => setView(dummy.week)}> week </button>
      </div>
    </div>
  );
};

export default HomeChart;
