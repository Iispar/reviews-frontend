import React, { useState } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import DoubleLineChart from '../../components/DoubleLineChart';
import reviewsService from '../../services/reviewsService';
import SkeletonLoad from '../../components/SkeletonLoad';
import LoadingBar from '../../components/LoadingBar';

/**
 * Renders the chart component for the item page
 * @property {String} className - Custom className if wanted. Default is itemChart.
 * @property {String} id - Custom id if wanted. Default is itemChart.
 * @property {String} initData - Data to initialize the chart with.
 * @property {String} itemId - Id of item that is displayed.
 * @property {String} token - Token for logged in account.
 * @property {Integer} initLoading - Initial state of loading.
 * @returns chart component for item.
 */
const ItemChart = ({
  className, id, initData, itemId, token, initLoading,
}) => {
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(initLoading);

  /**
   * Changes the view and sets the css for the active bar.
   * @param {String} selectionText
   *        The selected button as text.
   */
  const changeView = (selectionText) => {
    setLoading(2);
    setData(null);
    reviewsService.getChartForItem(itemId, selectionText, token)
      .then((res) => {
        setData(res);
        setLoading(0);
      });

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
  if (loading !== 0) {
    if (loading === 1) {
      return (
        <SkeletonLoad />
      );
    }
    return (
      <div className={className} id={id}>
        <div>
          <LoadingBar />
          <div className={`${className}__selector`} id={`${id}__selector`}>
            <button className={`${className}__selector__month`} type="button" onClick={() => changeView('month')}> month </button>
            <button className={`${className}__selector__week`} type="button" onClick={() => changeView('week')}> week </button>
            <div className={`${className}__selector__active`} id={`${id}__selector__active`} />
          </div>
        </div>
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
  initLoading: propTypes.number,
};

ItemChart.defaultProps = {
  className: 'itemChart',
  id: 'itemChart',
  initData: null,
  itemId: null,
  token: null,
  initLoading: 0,
};

export default ItemChart;
