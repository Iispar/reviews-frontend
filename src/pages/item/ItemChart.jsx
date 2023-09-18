import React, { useState } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import DoubleLineChart from '../../components/DoubleLineChart';
import reviewsService from '../../services/reviewsService';

/**
 * Renders the chart component for the item page
 * @property {String} className - Custom className if wanted. Default is itemChart.
 * @property {String} id - Custom id if wanted. Default is itemChart.
 * @property {String} initData - Data to initialize the chart with.
 * @property {String} itemId - Id of item that is displayed.
 * @property {String} token - Token for logged in account.
 * @returns chart component for item.
 */
const ItemChart = ({
  className, id, initData, itemId, token,
}) => {
  const [data, setData] = useState(initData);

  /**
   * Changes the view and sets the css for the active bar.
   * @param {String} selectionText
   *        The selected button as text.
   */
  const changeView = (selectionText) => {
    setData(null);
    reviewsService.getChartForItem(itemId, selectionText, token)
      .then((res) => setData(res));

    if (selectionText === 'month') {
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
  if (data == null) {
    return (
      <div className={className} id={id}>
        <div className={`${className}__loading`}> loading </div>
      </div>
    );
  }
  return (
    <div className={className} id={id}>
      {data.length > 2 ? (
        <div>
          <DoubleLineChart data={data} />
          <div className={`${className}__selector`} id={`${id}__selector`}>
            <button className={`${className}__selector__month`} type="button" onClick={() => changeView('month')}> month </button>
            <button className={`${className}__selector__week`} type="button" onClick={() => changeView('week')}> week </button>
            <div className={`${className}__selector__active`} id={`${id}__selector__active`} />
          </div>
        </div>
      ) : (
        <div className={`${className}__empty}`}> no data </div>
      )}
    </div>
  );
};

ItemChart.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  initData: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  itemId: propTypes.string,
  token: propTypes.string,
};

ItemChart.defaultProps = {
  className: 'itemChart',
  id: 'itemChart',
  initData: null,
  itemId: null,
  token: null,
};

export default ItemChart;
