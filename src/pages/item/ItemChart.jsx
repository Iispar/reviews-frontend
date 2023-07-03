import React, { useState } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import dummy from '../../data/dummyData/dummyHome.json';
import DoubleLineChart from '../../components/DoubleLineChart';

/**
 * Renders the chart component for the item page
 * @property {String} className - Custom className if wanted. Default is itemChart.
 * @property {String} id - Custom id if wanted. Default is itemChart.
 * @returns chart component for item.
 */
const ItemChart = (props) => {
  const { className } = props;
  const { id } = props;
  const [view, setView] = useState(dummy.month);

  /**
   * Changes the view and sets the css for the active bar.
   * @param {String} selection
   *        The selected month as data.
   * @param {String} selectionText
   *        The selected button as text.
   */
  const changeView = (selection, selectionText) => {
    setView(selection);
    if (selectionText === 'year') {
      $(`#${id}__selector__active`).css({
        left: '30px',
        width: '28px',
      });
    } else if (selectionText === 'month') {
      $(`#${id}__selector__active`).css({
        left: '63px',
        width: '38px',
      });
    } else {
      $(`#${id}__selector__active`).css({
        left: '106px',
        width: '32px',
      });
    }
  };
  return (
    <div className={className} id={id}>
      <DoubleLineChart data={view} />
      <div className={`${className}__selector`} id={`${id}__selector`}>
        <button className={`${className}__selector__year`} type="button" onClick={() => changeView(dummy.year, 'year')}> year </button>
        <button className={`${className}__selector__month`} type="button" onClick={() => changeView(dummy.month, 'month')}> month </button>
        <button className={`${className}__selector__week`} type="button" onClick={() => changeView(dummy.week, 'week')}> week </button>
        <div className={`${className}__selector__active`} id={`${id}__selector__active`} />
      </div>
    </div>
  );
};

ItemChart.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

ItemChart.defaultProps = {
  className: 'itemChart',
  id: 'itemChart',
};

export default ItemChart;
