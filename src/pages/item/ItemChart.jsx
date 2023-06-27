import React, { useState } from 'react';
import $ from 'jquery';
import dummy from '../../data/dummyData/dummyHome.json';
import DoubleLineChart from '../../components/DoubleLineChart';

/**
 * Renders the chart for the item page
 * @returns chart for item.
 */
const ItemChart = () => {
  const [view, setView] = useState(dummy.month);

  /**
   * Changes the view and sets the css for the active bar.
   * @param {*} selection
   * @param {*} selectionText
   */
  const changeView = (selection, selectionText) => {
    setView(selection);
    if (selectionText === 'year') {
      $('#itemChart__selector__active').css({
        left: '30px',
        width: '28px',
      });
    } else if (selectionText === 'month') {
      $('#itemChart__selector__active').css({
        left: '63px',
        width: '38px',
      });
    } else {
      $('#itemChart__selector__active').css({
        left: '106px',
        width: '32px',
      });
    }
  };
  return (
    <div className="itemChart" id="itemChart">
      <DoubleLineChart data={view} />
      <div className="itemChart__selector" id="itemChart__selector">
        <button className="itemChart__selector__year" type="button" onClick={() => changeView(dummy.year, 'year')}> year </button>
        <button className="itemChart__selector__month" type="button" onClick={() => changeView(dummy.month, 'month')}> month </button>
        <button className="itemChart__selector__week" type="button" onClick={() => changeView(dummy.week, 'week')}> week </button>
        <div className="itemChart__selector__active" id="itemChart__selector__active" />
      </div>
    </div>
  );
};

export default ItemChart;
