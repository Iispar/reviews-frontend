import React, { useState } from 'react';
import $ from 'jquery';
import dummy from '../../data/dummyData/dummyHome.json';
import DoubleLineChart from '../../components/DoubleLineChart';

/**
 * Renders the chart for the home page.
 * @returns the home chart
 */
const HomeChart = () => {
  const [view, setView] = useState(dummy.month);
  /**
   * Changes the view and sets the css for the active bar.
   * @param {*} selection
   * @param {*} selectionText
   */
  const changeView = (selection, selectionText) => {
    setView(selection);
    if (selectionText === 'year') {
      $('#homeChart__selector__active').css({
        left: '30px',
        width: '28px',
      });
    } else if (selectionText === 'month') {
      $('#homeChart__selector__active').css({
        left: '63px',
        width: '38px',
      });
    } else {
      $('#homeChart__selector__active').css({
        left: '106px',
        width: '32px',
      });
    }
  };

  return (
    <div className="homeChart">
      <DoubleLineChart data={view} />
      <div className="homeChart__selector">
        <button className="homeChart__selector__year" type="button" onClick={() => changeView(dummy.year, 'year')}> year </button>
        <button className="homeChart__selector__month" type="button" onClick={() => changeView(dummy.month, 'month')}> month </button>
        <button className="homeChart__selector__week" type="button" onClick={() => changeView(dummy.week, 'week')}> week </button>
        <div className="homeChart__selector__active" id="homeChart__selector__active" />
      </div>
    </div>
  );
};

export default HomeChart;
