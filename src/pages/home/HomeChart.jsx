import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import DoubleLineChart from '../../components/DoubleLineChart';

/**
 * Renders the chart component for the home page.
 * @property {String} ClassName - Custom className if wanted. Default homeChart.
 * @property {String} id - Custom id if wanted. Default homeChart.
 * @returns chart component
 */
const HomeChart = (props) => {
  const { className } = props;
  const { curData } = props;
  const { id } = props;
  const [data, setData] = useState();

  useEffect(() => {
    setData(curData);
  });

  /**
   * Changes the view and sets the css for the active bar.
   * @param {String} selection - which timespan was selected
   * @param {String} selectionText - text of selection
   */
  const changeView = (selectionText) => {
    setData(curData);
    if (selectionText === 'year') {
      $(`#${className}__selector__active`).css({
        left: '30px',
        width: '28px',
      });
    } else if (selectionText === 'month') {
      $(`#${className}__selector__active`).css({
        left: '63px',
        width: '38px',
      });
    } else {
      $(`#${className}__selector__active`).css({
        left: '106px',
        width: '32px',
      });
    }
  };

  return (
    <div className={className} id={id}>
      <DoubleLineChart data={data} />
      <div className={`${className}__selector`} id={`${id}__selector`}>
        <button className={`${className}__selector__year`} type="button" onClick={() => changeView('year')}> year </button>
        <button className={`${className}__selector__month`} type="button" onClick={() => changeView('month')}> month </button>
        <button className={`${className}__selector__week`} type="button" onClick={() => changeView('week')}> week </button>
        <div className={`${className}__selector__active`} id={`${id}__selector__active`} />
      </div>
    </div>
  );
};

HomeChart.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  curData: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

HomeChart.defaultProps = {
  className: 'homeChart',
  id: 'homeChart',
  curData: [],
};

export default HomeChart;
